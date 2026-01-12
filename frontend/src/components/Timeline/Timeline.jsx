import styles from "./Timeline.module.css";
export default function Timeline() {
  return (
    <>
      <div className="section" />
      <div className="constructorContainer">
        <div className={styles.yearSelectorContainer}>
          <span className={styles.yearText}> 2026 </span>
          <span className={styles.yearText}> 2025 </span>
          <span className={styles.yearText}> 2024 </span>
        </div>
      </div>

    <div className="section"/>
      <div className="constructorContainer">
        <div className={styles.timelineCard}> Nebius to triple capacity at Finland Datacenter</div>
      </div>
    </>
  );
}
