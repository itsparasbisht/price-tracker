const { Cluster } = require("puppeteer-cluster");

async function scrapPrice(urls) {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);

    // get item price
    let price = await page.evaluate(() => {
      let item = document.querySelector(".a-price-whole");
      return item.innerText.replace(/[.,]/g, "");
    });

    console.log({
      currentPrice: Number(price),
    });
  });

  for (let i = 0; i < urls.length; i++) {
    cluster.queue(urls[i]["url"]);
  }

  await cluster.idle();
  await cluster.close();
}

module.exports = scrapPrice;
