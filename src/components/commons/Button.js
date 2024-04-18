import styles from "styles/commons.module.scss";
import React from "react";
import { Link } from "react-router-dom";

export default function Button({ className, children, to = "/" }) {
  return (
    <Link to={to}>
      <div className={`${styles.button} ${className}`}>{children}</div>
    </Link>
  );
}

export function SubmitButton({ className, children }) {
  return (
    <button
      type={styles.submitBtn}
      className={`${styles.submitBtn} ${className}`}
    >
      {children}
    </button>
  );
}
