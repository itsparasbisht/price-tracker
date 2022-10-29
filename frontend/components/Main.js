import React, { useState } from "react";
import styles from "../styles/main.module.css";
import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";
import axios from "axios";
import Item from "./Item";

function Home() {
  const [itemUrl, setItemUrl] = useState("");
  const [itemData, setItemData] = useState(null);

  const getItem = async () => {
    try {
      const payload = { itemUrl };
      const response = await axios.post(
        "http://localhost:5000/get-item",
        payload
      );
      setItemData(response.data.item);
    } catch (error) {
      console.log(error);
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
        <button type="button" onClick={getItem}>
          Get Item
        </button>
      </form>
      <Item data={itemData} />
    </div>
  );
}

export default Home;
