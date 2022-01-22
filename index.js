const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const app = express();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use("/", express.json());

app.get("/", (req, res) => {
  res.send("hola!");
  res.end();
});

app.post("/api/insert", (req, res) => {
  const { word, wordMeaning, wordExample } = req.body;
  console.log(word, wordMeaning, wordExample);
  const sqlInsert = `INSERT INTO userwords (userID, word, wordMeaning, wordExample) VALUES ('dummy user', '${word}', '${wordMeaning}', '${wordExample}')`;
  db.query(sqlInsert, (err, result) => {
    console.log("Error", err);
    console.log("Message", result);
    res.status(200).end();
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Running... Listening on port ${process.env.PORT}`);
});
