import React from "react";
import styles from "../styles/main.module.css";
import Image from "next/image";
import rupeeIcon from "../assets/rupee-indian.png";
import axios from "axios";

function Home() {
  const getItem = async () => {
    try {
      const data = await axios.get("http://localhost:5000/");
      console.log(data);
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
        />
        <button type="button" onClick={getItem}>
          Get Item
        </button>
      </form>
    </div>
  );
}

export default Home;
