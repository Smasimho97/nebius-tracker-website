import { BarChart } from "@mui/x-charts/BarChart";
import { nebiusFinancials } from "../../data/financials.js";
import styles from "./Financials.module.css";

export default function Financials() {
  /* Financials we care about 
  1) Outstanding Debt / Dilution / Financing
  2) Operating Leverage
  3) Core Business Margins (EBITDA/EBIT)*/
  return (
    <div className="constructorContainer">
      <section className="section" />
      <h2 className={styles.cardHeader}> FINANCIALS </h2>

      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["bar A", "bar B", "bar C"],
              },
            ]}
            series={[
              {
                data: [2, 5, 3],
              },
            ]}
            height={300}
          />
        </div>
        <div className={styles.card}> </div>
      </div>
    </div>
  );
}
