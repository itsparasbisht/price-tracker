const puppeteer = require("puppeteer");

async function scrapPrice() {
  const URL =
    "https://www.amazon.in/JOISCOPE-Multi-Purpose-Adjustable-Portable-Assemble/dp/B0B9K6L3SR/ref=sr_1_16?crid=21YIVHWM16G9J&keywords=table&qid=1666793572&qu=eyJxc2MiOiI3Ljg4IiwicXNhIjoiNy41NiIsInFzcCI6IjYuNTgifQ%3D%3D&sprefix=table%2Caps%2C585&sr=8-16";

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
