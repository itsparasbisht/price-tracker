import React, { useState } from "react";
import styles from "../styles/main.module.css";
import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";
import axios from "axios";
import Item from "./Item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [itemUrl, setItemUrl] = useState("");
  const [scrapping, setScrapping] = useState(false);
  const [itemData, setItemData] = useState(null);

  const toastOptions = {
    toastId: "failed-scrap",
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const getItem = async () => {
    setScrapping(true);
    try {
      const payload = { itemUrl };
      const response = await axios.post(
        "http://localhost:5000/get-item",
        payload
      );

      if (response.data?.item) {
        setItemData(response.data.item);
      } else {
        toast.error("Failed to get the item", toastOptions);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    } finally {
      setScrapping(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Image src={rupeeIcon} alt="" />
        <h3>Amazon Price Tracker</h3>
      </nav>

      <form className={styles.getItemForm}>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="paste your product url here..."
          onChange={(e) => setItemUrl(e.target.value)}
        />
        <button type="button" onClick={getItem} disabled={scrapping}>
          Get Item
          {scrapping && <span className={styles.loader}></span>}
        </button>
      </form>
      <Item data={itemData} />
      <ToastContainer />
    </div>
  );
}

export default Home;
