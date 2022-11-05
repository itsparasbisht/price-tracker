const Items = require("../model/items");

const dbConnect = require("../db/dbConnect");
const connected = dbConnect();

const scrapPrice = require("./scrapPrice");

const sendMail = require("./mailWithData");

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

      const data = scrapPrice(urls);
      data.then((res) => {
        console.log(res);
      });
    }
  });
}
