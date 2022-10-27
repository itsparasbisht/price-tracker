import React from "react";
import styles from "../styles/item.module.css";

function Item() {
  return (
    <div className={styles.container}>
      <img
        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632788573000"
        alt="Picture of something"
        className={styles.itemImage}
      />
      <div className={styles.itemDetails}>
        <h2>
          2020 Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm
          Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime
          HD Camera, Touch ID. Works with iPhone/iPad; Gold{" "}
        </h2>
        <p>
          Current Price: <span>Rs 80,000</span>
        </p>
        <h5>Select price to get notified:</h5>
        <input
          type="number"
          name="select-price"
          id=""
          max={80000}
          min={10}
          //   value={80000}
          className={styles.selectPrice}
        />
      </div>
    </div>
  );
}

export default Item;
