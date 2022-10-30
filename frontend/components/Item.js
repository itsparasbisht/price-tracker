import React, { useEffect, useState } from "react";
import styles from "../styles/item.module.css";

function Item({ data }) {
  console.log(">>>", data);
  const [itemFound, setItemFound] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    if (data?.price) {
      setItemFound(true);
      setSelectedPrice(data.price);
    }
  }, [data]);

  if (itemFound) {
    return (
      <div className={styles.container}>
        <img src={data.image} alt={data.title} className={styles.itemImage} />
        <div className={styles.itemDetails}>
          <h2>{data.title}</h2>
          <p>
            Current Price: <span>Rs {data.price}</span>
          </p>
          <h5>Select price to get notified:</h5>
          <input
            type="number"
            name="select-price"
            id=""
            max={data.price}
            min={10}
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className={styles.selectPrice}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.noItem}>
        <p>
          Paste your product URL from Amazon here at top to track product price.
        </p>
      </div>
    );
  }
}

export default Item;
