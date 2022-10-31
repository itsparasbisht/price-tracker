import React, { useState } from "react";
import styles from "../styles/subscribe.module.css";
import * as EmailValidator from "email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function Subscribe({ data }) {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  console.log("data:", data);

  const doNotify = async () => {
    setProcessing(true);

    const isValidEmail = EmailValidator.validate(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email", toastOptions);
      setProcessing(false);
    } else {
      const analyzeResponse = analyzePrice();

      if (analyzeResponse === "proceed") {
        const payload = {
          ...data,
          email,
        };

        console.log("payload:", payload);
        try {
          axios.post("http://localhost:5000/notify", payload);
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong", {
            ...toastOptions,
            autoClose: 10000,
            toastId: "notify-error",
          });
        }
      } else {
        toast.warn(analyzeResponse, {
          ...toastOptions,
          autoClose: 10000,
          toastId: analyzeResponse,
        });
        setProcessing(false);
      }
    }
  };

  const analyzePrice = () => {
    const price = data.price;
    const userPrice = data.selectedPrice;

    if (userPrice >= price) {
      return "Select price lower than current price";
    } else if (userPrice < price / 2) {
      return "Selected price is too low, we suggest you to select a reasonable price.";
    } else {
      return "proceed";
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
        <button onClick={doNotify}>
          Notify
          {processing && <span className={styles.loader}></span>}
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Subscribe;
