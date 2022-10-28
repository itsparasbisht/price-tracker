import React, { useState } from "react";
import styles from "../styles/main.module.css";
import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";
import axios from "axios";

function Home() {
  const [itemUrl, setItemUrl] = useState("");
  console.log(itemUrl);

  const getItem = async () => {
    try {
      const payload = { itemUrl };
      const response = await axios.post(
        "http://localhost:5000/get-item",
        payload
      );
      console.log(response);
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
    </div>
  );
}

export default Home;
