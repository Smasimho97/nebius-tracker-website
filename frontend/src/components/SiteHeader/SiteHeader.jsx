import { useState } from "react";
import { Link } from "react-router-dom";  // ← Add this
import styles from "./SiteHeader.module.css";
import logo from "../../assets/nbis-white.svg";
import hamburger from "../../assets/hamburger.svg";
import chevron from "../../assets/chevron.svg";
import ContactForm from "../Contact/Contact.jsx";

export default function SiteHeader() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const closeForm = () => setIsContactOpen(false);  // Fixed: should just set to false

  return (
    <>
      <header className={`constructorContainer ${styles.header}`}>
        <Link to="/">  {/* ← Wrap logo */}
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/datacenter" className={styles.navButton}>
                Datacenter Roadmap
              </Link>
            </li>
            <li>
              <Link to="/knowledge" className={styles.navButton}>
                Knowledge Hub
              </Link>
            </li>
            <li>
              <button
                className={styles.navButton}
                onClick={() => setIsContactOpen(true)}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>

        {/* Contact Form */}
        {isContactOpen && <ContactForm onClose={closeForm} />}

        {/* Mobile Nav Toggle */}
        <button
          className={styles.hamburger}
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <img src={hamburger} alt="" />
        </button>
      </header>

      {/* Mobile Dropdown */}
      {isHamburgerOpen && (
        <div className="constructorContainer">
          <ul className={styles.dropdown}>
            <li className={styles.dropdownItem}>
              <Link to="/knowledge">
                <span>Knowledge Hub</span>
                <img src={chevron} alt="" />
              </Link>
            </li>
            <li className={styles.dropdownItem}>
              <button onClick={() => setIsContactOpen(true)}>
                <span>Feedback</span>
                <img src={chevron} alt="" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}