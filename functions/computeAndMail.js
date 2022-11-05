function computeAndMail(items, currentPrice) {
  const itemUpdated = [];

  items.forEach((item) => {
    const itemId = item.id;

    for (let i = 0; i < currentPrice.length; i++) {
      if (currentPrice[i].id === itemId) {
        itemUpdated.push({
          ...item,
          currentPrice: currentPrice[i].currentPrice,
        });
        break;
      }
    }
  });

  console.log(itemUpdated);
}

module.exports = computeAndMail;
