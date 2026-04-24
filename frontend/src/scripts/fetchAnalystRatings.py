import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

def parse_target(s):
    if not s or s.strip() in ("—", "-", ""):
        return None
    match = re.search(r"\$?([\d.]+)", s)
    return float(match.group(1)) if match else None

def parse_date(s):
    try:
        return datetime.strptime(s.strip(), "%m/%d/%Y").strftime("%Y-%m-%d")
    except:
        return s.strip()

def parse_action(rating_change, prev_target, new_target):
    rc = rating_change or ""
    if "Initiates" in rc:
        return "initiated"
    if isinstance(prev_target, float) and isinstance(new_target, float):
        if new_target > prev_target:
            return "raised"
        elif new_target < prev_target:
            return "lowered"
    return "maintained"

def scrape(ticker="NBIS"):
    url = f"https://www.benzinga.com/quote/{ticker}/analyst-ratings"
    res = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    soup = BeautifulSoup(res.text, "html.parser")

    rows = []
    for tr in soup.select("table tbody tr"):
        cols = [td.get_text(strip=True) for td in tr.find_all("td")]
        if len(cols) < 6:
            continue

        date, _, _, firm, pt_change, rating_change, rating, *_ = cols + [None] * 8

        rating = re.sub(r"^→\s*", "", rating or "").strip() or "-"

        prev_target, new_target = None, None
        if pt_change:
            parts = pt_change.split("→")
            if len(parts) == 2:
                prev_target = parse_target(parts[0])
                new_target  = parse_target(parts[1])
            else:
                new_target = parse_target(parts[0])

        rows.append({
            "date":        parse_date(date),
            "firm":        firm,
            "rating":      rating,
            "action":      parse_action(rating_change, prev_target, new_target),
            "prev_target": prev_target,
            "new_target":  new_target if new_target else "-",
        })

    return rows

def main():
    ratings = scrape("NBIS")
    ratings.sort(key=lambda x: x["date"], reverse=True)

    with open("src/data/analystRatings.json", "w") as f:
        json.dump(ratings, f, indent=2)

    print(f"Written {len(ratings)} ratings")
    for r in ratings[:5]:
        print(f"  {r['date']} | {r['firm']:25} | {str(r['prev_target']):>6} → {str(r['new_target']):>6} | {r['action']}")

if __name__ == "__main__":
    main()