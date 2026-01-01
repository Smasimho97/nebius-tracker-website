import styles from "./Footer.module.css";
import { FaReddit, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className="section"></div>
      <div className={`constructorContainer ${styles.footer}`}>
        <div className={styles.subscribeContainer}>
          <div className={styles.callToAction}> Stay in the Loop </div>
          <div className={styles.sideBySideWrap}>
            <input
              type="email"
              placeholder="Type your email..."
              className={styles.inputBox}
            ></input>
            <button className={styles.subscribeButton}>
              <span> Subscribe </span>
            </button>
          </div>
          <div className={styles.icons}>
            <a
              href="https://www.reddit.com/user/Individual_Public839/"
              aria-label="Reddit"
            >
              <FaReddit size={20} />
            </a>
            <a href="https://x.com/SMASIMHO" aria-label="X">
              <FaXTwitter size={20} />
            </a>

            <a href="https://github.com/Smasimho97" aria-label="Github">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="section"></div>
    </>
  );
}
