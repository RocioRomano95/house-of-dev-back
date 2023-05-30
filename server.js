require("dotenv").config();
const express = require("express");
const router = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const app = express();

app.use(cookiesParser());
app.use(cors({ origin: "http://localhost:3000", credential: true }));
app.use(express.json());
app.use("/api", router);

const PORT = process.env.SERVER_PORT;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
