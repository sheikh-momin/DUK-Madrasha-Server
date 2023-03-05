const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
  res.send("DUK Madrasa Portal Server is running");
});

app.listen(port, () => {
  console.log(`DUK Madrasa Portal Running On ${port}`);
});
