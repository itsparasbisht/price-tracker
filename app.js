const express = require("express");
const scrapItem = require("./scrapItem");
const app = express();

const PORT = 5000 || process.env.PORT;

app.use(express.json());

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// api routes
app.get("/", (req, res) => {
  res.json({ message: "initial route to amazon price tracker" });
});

app.post("/get-item", (req, res) => {
  const { itemUrl } = req.body;

  if (itemUrl) {
    const data = scrapItem(itemUrl);
    console.log("DATA --->", data);
    data
      .then((response) => {
        console.log(">>>", response);
        res.json({ item: response });
      })
      .catch((error) => {
        console.log("---", error);
        res.json({ error: "failed" });
      });
  } else {
    res.json({
      message: "provide product url from amazon in your request body",
    });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
