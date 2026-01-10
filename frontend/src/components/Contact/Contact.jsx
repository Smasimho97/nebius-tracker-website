import styles from "./Contact.module.css";

export default function ContactForm({ onClose }) {
  return (
    <div className={styles.contactFormOverlay}>
      <div className={styles.contactFormContainer}>
        <div className={styles.contactFormHeader}> Contact Us </div>
        <button
          className={styles.exitButton}
          onClick={onClose}
          aria-label="Close Contact Form"
        >
          ×
        </button>
        <div className={styles.contactFormField}>
          <div className={styles.contactFormCategory}>
            {" "}
            Preferred Identifier{" "}
          </div>
          <select className={styles.contactFormSelect}>
            <option value="anonymous">Anonymous</option>
            <option value="email">Email</option>
            <option value="reddit">Reddit</option>
            <option value="x">X (Twitter)</option>
          </select>
        </div>
        <div className={styles.contactFormField}>
          <div className={styles.contactFormCategory}> Alias (Optional) </div>
          <input className={styles.contactFormInput}></input>
        </div>
        <div className={styles.feedbackInputContainer}>
          <div className={styles.contactFormCategory}> Feedback </div>
          <textarea
            placeholder="Share your thoughts! Please limit your feedback to 500 characters."
            maxLength={500}
            rows={7}
            className={styles.feedbackInput}
          />
        </div>
        <button className={styles.submitButton}>
          <span>Submit</span>
        </button>
      </div>
    </div>
  );
}
