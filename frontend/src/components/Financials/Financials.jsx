import { useState } from "react";
import {
  FinancialLeverage,
  FinancialLeveragePercentage,
  OperatingLeverage,
} from "./VictoryCharts.jsx";
import styles from "./Financials.module.css";

export default function Financials() {
  const [isFinancialsUnitToggle, setFinancialsUnitToggle] = useState(false);
  const [isOperatingUnitToggle, setOperatingUnitToggle] = useState(false);

  return (
    <div className="constructorContainer">
      <section className="section" />
      <h2 className={styles.cardGridHeader}>FINANCIALS</h2>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          {!isFinancialsUnitToggle && <FinancialLeverage />}
          {isFinancialsUnitToggle && <FinancialLeveragePercentage />}

          <div className={styles.unitToggleContainer}>
            <span className={styles.unitToggleBarText}> $ </span>
            <div className={styles.unitToggleBar}>
              <button
                className={`${styles.unitToggleButton} ${
                  isFinancialsUnitToggle ? styles.toggled : ""
                }`}
                onClick={() => setFinancialsUnitToggle((prev) => !prev)}
              ></button>
            </div>
            <span className={styles.unitToggleBarText}> % </span>
          </div>
        </div>
        <div className={styles.card}>
          <OperatingLeverage />
        </div>
      </div>
    </div>
  );
}
