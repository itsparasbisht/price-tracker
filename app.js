const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;

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

app.get("/get-item", (req, res) => {
  res.json({ item: "hello" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
