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
      </div>
    </div>
  );
}

export default Item;
