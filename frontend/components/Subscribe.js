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

function Subscribe({ data, setData }) {
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
          const response = await axios.post(
            "http://localhost:5000/notify",
            payload
          );
          if (response) {
            toast.success(
              `Successfully Done, we will notify you through mail whenever the price drops to Rs ${response.data.item.priceSelected}`,
              {
                ...toastOptions,
                autoClose: 10000,
                toastId: "notify-success",
                position: "bottom-left",
              }
            );

            setTimeout(() => {
              setData(null);
            }, 3000);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong", {
            ...toastOptions,
            autoClose: 10000,
            toastId: "notify-error",
          });
        } finally {
          setProcessing(false);
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

    if (userPrice === NaN || userPrice === 0) {
      return "Enter a valid amount";
    } else if (userPrice >= price) {
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
        <button onClick={doNotify} disabled={processing}>
          Notify
          {processing && <span className={styles.loader}></span>}
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Subscribe;
