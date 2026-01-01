import { useState } from "react";
import styles from "./SiteHeader.module.css";
import logo from "../../assets/nbis-white.svg";
import hamburger from "../../assets/hamburger.svg";
import chevron from "../../assets/chevron.svg";

export default function SiteHeader() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <header className={`constructorContainer ${styles.header}`}>
        <img className={styles.logo} src={logo} />

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="/datacenter" className={styles.navButton}>
                Datacenter
              </a>
            </li>
            <li>
              <a href="/knowledge-hub" className={styles.navButton}>
                Knowledge Hub
              </a>
            </li>
            <li>
              <button
                className={styles.navButton}
                onClick={() => setIsContactOpen((prev) => !prev)}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Contact Form */}
        {isContactOpen && <></>}

        {/* Mobile Nav Toggle */}
        <button
          className={styles.hamburger}
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <img src={hamburger} />
        </button>
      </header>

      {/* Mobile Dropdown */}
      {isHamburgerOpen && (
        <div className="constructorContainer">
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <span>Knowledge Hub</span>
              <img src={chevron} />
            </li>
            <li className={styles.dropdownItem}>
              <span>Feedback</span>
              <img src={chevron} />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
