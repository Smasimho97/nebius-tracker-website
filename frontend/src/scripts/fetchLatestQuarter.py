import requests
import re
import json

def get_latest_nebius_quarter():
    res = requests.get("https://nebius.com/financials")
    match = re.search(r'Q([1-4])\s*(?:/\s*FY\s*)?\s*(\d{4})', res.text)
    quarter = int(match.group(1))
    year = int(str(match.group(2))[-2:])
    return quarter, year

quarter, year = get_latest_nebius_quarter()

with open("src/data/currentQuarter.json", "w") as f:
    json.dump({ "quarter": quarter, "year": year }, f)

print(f"Written Q{quarter}'{year}")