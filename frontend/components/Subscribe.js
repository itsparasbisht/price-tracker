import React from "react";
import styles from "../styles/subscribe.module.css";

function Subscribe() {
  return (
    <div className={styles.container}>
      <input type="email" name="email" id="email" />
      <button>Notify</button>
    </div>
  );
}

export default Subscribe;
