const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET", "POST","DELETE"]
}));
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v3avrd5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const totalMonyCollection = client.db('dUKMadrasha').collection('totalMoney');
    const studentMonyCollection = client.db('dUKMadrasha').collection('studentMoney');

    // Total Mony
    app.get("/totalMoney", async (req, res) => {
      const query = {};
      const result = await totalMonyCollection.find(query).toArray();
      res.send(result);
    });

    
      // Student Mony
    app.post('/studentMoney', async (req, res) => {
      const monyInfo = req.body
      const result = await studentMonyCollection.insertOne(monyInfo)
      res.send(result)
    })

    app.get('/studentMoney/:classRoll', async (req, res) => {
      const classRoll = req.params.classRoll;
      const query = { classRoll };
      const service = await studentMonyCollection.findOne(query);
      res.send(service);
    });

    app.delete("/studentMoney/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await studentMonyCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/studentMoney", async (req, res) => {
      const query = {};
      const result = await studentMonyCollection.deleteMany(query);
      res.send(result);
    });

    app.get("/studentMoney", async (req, res) => {
      const query = {};
      const result = await studentMonyCollection.find(query).toArray();
      res.send(result);
    });


  }
  finally{

  }
}
run().catch(console.log)

app.get("/", async (req, res) => {
  res.send("DUK Madrasa Portal Server is running");
});

app.listen(port, () => {
  console.log(`DUK Madrasa Portal Running On ${port}`);
});
