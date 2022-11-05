function computeAndMail(item, currentPrice) {
  const data = item.map(item, (i) => {
    return {
      ...item,
      CID: currentPrice.id,
      currentPrice,
    };
  });

  console.log(data);
}

module.exports = computeAndMail;
