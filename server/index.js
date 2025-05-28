const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// var admin = require("firebase-admin");

// var serviceAccount = require("./package.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const uri = "mongodb+srv://faisal2:anCKvk20YK2t2BI0@cluster0.fc5kt4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://faisal2:anCKvk20YK2t2BI0@cluster0.fc5kt4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const port = process.env.PORT || 3000;
// const uri =
//   "mongodb+srv://coffee-monster:KZpa7eEfSIallrGi@cluster0.fc5kt4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = `mongodb+srv://coffee-monster:KZpa7eEfSIallrGi@cluster0.gbi6src.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://garden_hub:pRjNbdntHIgyi98z@cluster0.gojofrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const uri = `mongodb+srv://room_wala:uDL5RlqZzQXzQt1p@cluster0.8xhugn7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

    // const db = client.db("community");
    // const postCollection = db.collection("posts");
    const db = client.db("usersdb2")
    const userCollection = db.collection("users");

    app.get("/posts", async (req, res) => {
      try {
         const result = await postCollection.find().toArray();
      res.send(result);
      } catch (error) {
        
        
      }
    });

    app.post("/posts", async (req, res) => {
       try {
        const data = req.body
        
        const result = await postCollection.insertOne(data);
        res.send(result);
        
       } catch (error) {
        console.error("Error inserting post:", error);
        res.status(500).json({ error: "Failed to insert post" });
       }
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection
        .find()
        .sort({ displayName: 1 })
        .toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const { displayName, photoURL, email } = req.body;
      console.log(req.body);
      try {
        const result = await userCollection.insertOne({
          displayName,
          photoURL,
          email,
        });
        res.send(result);
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ error: "Failed to insert user" });
      }
    });

    app.put("/users/:id", (req, res) => {
      const data = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Working..." });
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
