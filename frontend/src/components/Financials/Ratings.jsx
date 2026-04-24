import styles from "./Ratings.module.css";
import analystRatings from "../../data/analystRatings.json";
import summary from "../../assets/icons/summary.svg";
import recent from "../../assets/icons/recent.svg"
import { useState } from "react";

export default function Ratings() {

  const [isToggleActive, setToggleActive] = useState(false);

  return (
    <div className={styles.ratingsContainer}>
      <div className={styles.ratingsHeader}> 
        <div>Analyst Ratings </div>
        <button className={styles.toggleContainer}
                onClick={()=>setToggleActive((prev)=>!prev)}
                > 
          <img src={setToggleActive === false ? recent : summary}></img>
        </button>
      </div>

      <div className={styles.ratingsRowContainer}>
        {isToggleActive === false &&    
          analystRatings.map((rating, i) => (
            <div
              key={i}
              className={
                i % 2 === 0
                  ? styles.ratingsLightRowContainer
                  : styles.ratingsDarkRowContainer
              }
            >
              <span className={styles.muted}>{rating.date}</span>
              <span>{rating.firm}</span>
              <span>{rating.rating}</span>
              <span>
                <span
                  className={
                    rating.action === "raised"
                      ? styles.badgeRaised
                      : rating.action === "initiated"
                        ? styles.badgeInit
                        : rating.action === "lowered"
                          ? styles.badgeLowered
                          : styles.badgeMaint
                  }
                >
                  {rating.action}
                </span>
              </span>
              <span
                className={
                  rating.action === "raised"
                    ? styles.ptUp
                    : rating.action === "initiated"
                      ? styles.ptNew
                      : rating.action === "lowered"
                        ? styles.ptDown
                        : styles.ptFlat
                }
              >
                {rating.new_target !== "-" ? `$${rating.new_target}` : "—"}
              </span>
            </div>
          ))}

      </div>
    </div>
  );
}
