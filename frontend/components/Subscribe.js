import React, { useState } from "react";
import styles from "../styles/subscribe.module.css";
import * as EmailValidator from "email-validator";
import { ToastContainer, toast } from "react-toastify";

const toastOptions = {
  toastId: "invalid-email",
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function Subscribe() {
  const [email, setEmail] = useState("");

  const doNotify = () => {
    const isValidEmail = EmailValidator.validate(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email", toastOptions);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email..."
        />
        <button onClick={doNotify}>Notify</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Subscribe;
