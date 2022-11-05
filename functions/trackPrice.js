const Items = require("../model/items");

const dbConnect = require("../db/dbConnect");
const connected = dbConnect();

const scrapPrice = require("./scrapPrice");

const computeAndMail = require("./computeAndMail");

let items = [];

if (connected) {
  Items.find({ active: true }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      items = res;

      const urls = items.map((item) => {
        return {
          id: item.id,
          url: item.productUrl,
        };
      });

      //   const data = scrapPrice(urls);
      //   data.then((res) => {
      // console.log(res);
      // computeAndMail(items, res);
      //     console.log(items);
      //     console.log(res);
      //   });

      const prices = [
        { id: "63661c920be5404b869559e5", currentPrice: 56490 },
        { id: "63661e34b2e6eef625ed8021", currentPrice: 8419 },
        { id: "63661ecdb2e6eef625ed8023", currentPrice: 699 },
      ];
      computeAndMail(items, prices);
    }
  });
}
