const puppeteer = require("puppeteer");

async function scrapPrice() {
  const URL =
    "https://www.amazon.in/SanDisk-Portable-Smartphone-Compatible-Warranty/dp/B08GTYFC37/";

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    // get item title
    let title = await page.evaluate(() => {
      let item = document.querySelector("#productTitle");
      return item.innerText;
    });

    // get item price
    let price = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return item.innerText.replace(/[.,]/g, "");
    });

    // get item image
    let image = await page.evaluate(() => {
      let item = document.querySelector("#landingImage");
      return item.getAttribute("src");
    });

    await browser.close();

    return {
      title,
      image,
      price: parseInt(price),
    };
  } catch (error) {
    console.error(error);
  }
}

const data = scrapPrice();
data.then((data) => {
  console.log(data);
});
