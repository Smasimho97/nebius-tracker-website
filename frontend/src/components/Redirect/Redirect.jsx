import styles from "./Redirect.module.css";

export default function Redirect() {
  return (
    <>
      <div className="section" />
      <div className="constructorContainer">
        <footer className={styles.redirectContainer}>
          <a
            className={`${styles.nebiusRedirect} ${styles.redirectCard}`}
            href="https://nebius.com"
          >
            <span className={styles.linkContent}>
              <span> Official Portal </span>
              <span>→</span>
            </span>
          </a>

          <a
            className={`${styles.clustermaxRedirect} ${styles.redirectCard}`}
            href="https://newsletter.semianalysis.com/p/clustermax-20-the-industry-standard"
          >
            <span className={styles.linkContent}>
              <span> NeoCloud Overview </span>
              <span>→</span>
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}