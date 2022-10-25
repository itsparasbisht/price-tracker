const className = "a-price-whole";
const url =
  "https://www.amazon.in/SanDisk-Portable-Smartphone-Compatible-Warranty/dp/B08GTYFC37";

const nightmare = require("nightmare");

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("a-price-whole")
    .evaluate(() => document.querySelector(className).innerText)
    .end();

  const priceNumber = parseInt(priceString);
  console.log(priceNumber);

  if (priceNumber < 1500) {
    console.log("it is cheap");
  } else {
    console.log("it is expensive");
  }
}
