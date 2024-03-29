const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT || 5000;


// middleware 

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello Real State Giant")
});






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bupigg3.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();


    const featureCollection = client.db("asiaJapanDB").collection("features");
    const popularPropertiesCollection = client.db("asiaJapanDB").collection("popularProperties");
    const blogsCollection = client.db("asiaJapanDB").collection("blogs");

    app.get("/features", async (req, res) => {
      const result = await featureCollection.find().toArray()
      res.send(result);
    });

    app.get("/popularProperties", async (req, res) => {
      const result = await popularPropertiesCollection.find().toArray();
      res.send(result);
    });
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find().toArray();
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(` Asia Japan Real State is running on :${port}`)
});

