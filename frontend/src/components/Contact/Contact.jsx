import styles from "./Contact.module.css";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import { FaReddit, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SERVICE_ID  = "service_qc17i5n";
const TEMPLATE_ID = "template_kf2azqm";
const PUBLIC_KEY  = "WbAKY5kch3vs6zZFl";

export default function ContactForm({ onClose }) {

  const [fields, setFields] = useState({
    identifier: "anonymous",
    alias: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const lastSubmit = useRef(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (name === "message") setError("");
  }

  async function handleSubmit() {

    const now = Date.now();
    if (now - lastSubmit.current < 30000) {
      setError("Please wait 30 seconds before submitting again (´ε｀；)");
      return;
    }

    if (fields.message.trim().length < 5) {
      setError("人´∀｀) Please leave at least 5 characters of feedback for this poor soul");
      return;
    }

    lastSubmit.current = now;
    setStatus("sending");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, fields, PUBLIC_KEY);
      setStatus("success");
      setFields({ identifier: "anonymous", alias: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

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
          <div className={styles.contactFormCategory}> Preferred Identifier </div>
          <select
            name="identifier"
            value={fields.identifier}
            onChange={handleChange}
            className={styles.contactFormSelect}
          >
            <option value="anonymous">Anonymous</option>
            <option value="email">Email</option>
            <option value="reddit">Reddit</option>
            <option value="x">X (Twitter)</option>
          </select>
        </div>

        <div className={styles.contactFormField}>
          <div className={styles.contactFormCategory}> Alias (Optional) </div>
          <input
            name="alias"
            value={fields.alias}
            onChange={handleChange}
            className={styles.contactFormInput}
          />
        </div>

        <div className={styles.feedbackInputContainer}>
          <div className={styles.contactFormCategory}> Feedback </div>
          <textarea
            name="message"
            value={fields.message}
            onChange={handleChange}
            placeholder="Please limit feedback to 300 characters"
            maxLength={300}
            rows={7}
            className={styles.feedbackInput}
          />
          {error && <span className={styles.errorText}>{error}</span>}
        </div>

        <div className={styles.formFooter}>
          <div className={styles.socialIcons}>
            <a href="https://www.reddit.com/user/Individual_Public839/" aria-label="Reddit" className={styles.socialIcon}>
              <FaReddit size={20} />
            </a>
            <a href="https://x.com/SMASIMHO" aria-label="X" className={styles.socialIcon}>
              <FaXTwitter size={20} />
            </a>
            <a href="https://github.com/Smasimho97" aria-label="Github" className={styles.socialIcon}>
              <FaGithub size={18} />
            </a>
          </div>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={status === "sending"}
          >
            <span>
              {status === "idle"    && "Submit"}
              {status === "sending" && "Sending..."}
              {status === "success" && "Sent!"}
              {status === "error"   && "Try again"}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}