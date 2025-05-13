const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;
const uri =
  "mongodb+srv://faisal:kkvGsr9jTW3YtgOa@cluster0.fc5kt4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("usersdb").collection("users");

    app.get("/", (req, res) => {
      res.status(200).json({ msg: "Working..." });
    });

    app.post("/users", async (req, res) => {
      const { displayName, photoURL, email } = req.body;
      console.log(req.body);
     try {
        const result = await userCollection.insertOne({ displayName, photoURL, email });
        res.status(200).json(result);
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Failed to insert user" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } 
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
