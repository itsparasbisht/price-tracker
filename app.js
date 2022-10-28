const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", function (req, res) {
  res.json({ message: "initial route to amazon price tracker" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
