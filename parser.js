const puppeteer = require("puppeteer");

async function scrapPrice() {
  const URL =
    "https://www.amazon.in/SanDisk-Portable-Smartphone-Compatible-Warranty/dp/B08GTYFC37/";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    let data = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return item.innerText.replace(/[.,]/g, "");
    });
    await browser.close();

    return parseInt(data);
  } catch (error) {
    console.error(error);
  }
}

const price = scrapPrice();
price.then((data) => {
  console.log(data);
});
