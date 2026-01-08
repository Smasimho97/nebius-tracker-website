import {FinancialLeverage, OperatingLeverage} from "./VictoryCharts.jsx"
import styles from "./Financials.module.css";

export default function Financials() {
  /* Financials we care about 
  1) Outstanding Debt / Dilution / Financing
  2) Operating Leverage
  3) Core Business Margins (EBITDA/EBIT)*/
  return (
    <div className="constructorContainer">
      <section className="section" />
      <h2 className={styles.cardGridHeader}>FINANCIALS</h2>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <FinancialLeverage/>
        </div>
        <div className={styles.card}>
          <OperatingLeverage/>
        </div>
      </div>
    </div>
  );
}
