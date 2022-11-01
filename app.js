const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");

const PORT = 5000 || process.env.PORT;

const getItemRouter = require("./routes/getItem");
const notifyRouter = require("./routes/notify");

app.use(express.json());

dbConnect();

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

app.use("/get-item", getItemRouter);
app.use("/notify", notifyRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
