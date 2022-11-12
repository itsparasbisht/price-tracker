import React, { useEffect, useState } from "react";
import styles from "../styles/main.module.css";
import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";
import axios from "axios";
import Item from "./Item";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Subscribe from "./Subscribe";
import config from "../config/config";

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

function Home() {
  const [itemUrl, setItemUrl] = useState("");
  const [scrapping, setScrapping] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [userPrice, setUserPrice] = useState(0);

  useEffect(() => {
    if (itemData?.price) {
      setUserPrice(itemData.price);
    }
  }, [itemData]);

  const getItem = async () => {
    toast.warn("Fetching your item, please wait...", {
      ...toastOptions,
      autoClose: 10000,
    });

    const waitingCheck = setTimeout(() => {
      takingTime();
    }, 20000);

    setScrapping(true);
    try {
      const payload = { itemUrl };
      const response = await axios.post(`${config.apiUrl}/get-item`, payload);

      if (response.data?.item) {
        setItemData(response.data.item);
        clearTimeout(waitingCheck);
      } else {
        toast.error("Failed to get the item", toastOptions);
        clearTimeout(waitingCheck);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
    } finally {
      setScrapping(false);
    }
  };

  const takingTime = () => {
    toast.warn("Taking some time to fetch, please wait...", {
      ...toastOptions,
      autoClose: 10000,
    });
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
        <button
          type="button"
          onClick={getItem}
          disabled={scrapping || !itemUrl}
        >
          Get Item
          {scrapping && <span className={styles.loader}></span>}
        </button>
      </form>
      <Item data={itemData} userPriceSetter={setUserPrice} />
      {itemData && (
        <Subscribe
          data={{
            ...itemData,
            productUrl: itemUrl,
            selectedPrice: Number(userPrice),
          }}
          setData={setItemData}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
