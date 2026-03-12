import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MapHeader.module.css";
import logo from "../../../assets/nebius/nebius-white.svg";
import hamburger from "../../../assets/icons/hamburger-white.svg";
import exit from "../../../assets/icons/nav-exit-white.svg";
import timeline from "../../../assets/icons/timeline-white.svg";
import finance from "../../../assets/icons/finance-white.svg";
import contact from "../../../assets/icons/contact-white.svg";
import ContactForm from "../../Contact/Contact.jsx";

export default function MapHeader() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 675) setIsHamburgerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link to="/"><img className={styles.logo} src={logo} alt="Logo" /></Link>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><Link to="/datacenter_timeline" className={styles.navButton}>Datacenter Timeline</Link></li>
            <li><Link to="/financials" className={styles.navButton}>Financials</Link></li>
            <li><button className={styles.navButton} onClick={() => setIsContactOpen(true)}>Contact</button></li>
          </ul>
        </nav>
        <button className={styles.hamburger} onClick={() => setIsHamburgerOpen((prev) => !prev)} aria-label="Toggle menu">
          <img src={isHamburgerOpen ? exit : hamburger} alt="" />
        </button>
      </header>

      {isContactOpen && <ContactForm onClose={() => setIsContactOpen(false)} />}

      {isHamburgerOpen && (
        <div className={styles.dropdown}>
          <Link to="/datacenter_timeline" style={{ textDecoration: "none", display: "block" }}>
            <div className={styles.dropdownItemContainer}>
              <img src={timeline} alt="" />
              <div className={styles.dropdownItem}>Datacenter Timeline</div>
            </div>
          </Link>
          <Link to="/financials" style={{ textDecoration: "none", display: "block" }}>
            <div className={styles.dropdownItemContainer}>
              <img src={finance} alt="" />
              <div className={styles.dropdownItem}>Financials</div>
            </div>
          </Link>
          <button className={styles.contactContainer} onClick={() => setIsContactOpen(true)}>
            <img src={contact} alt="" />
            <div className={styles.dropdownItem}>Contact</div>
          </button>
        </div>
      )}
    </>
  );
}