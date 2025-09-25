let express = require("express");
let app = express();
require("dotenv").config();
let { mongoConnect, getDb } = require("./database/db.js");
const { MongoClient, ObjectId } = require('mongodb');
let PORT = process.env.PORT;
let Product = require("./models/product.js");
let User = require('./models/user.js');
app.use(express.json());

app.post("/add-product", async (req, res) => {
  let { title, price, description, imageUrl } = req.body;
  let p1 = new Product(title, price, description, imageUrl);
  let result = await p1.save();
  res.status(200).json({ result });
});

app.get("/get-product", async (req, res) => {
  const db = getDb();
  let products =  await db.collection('products').find().toArray();
  return res.status(200).json({ products });
});

app.get("/get-productbyid/:id",async(req,res)=>{
    try {
        let {id} = req.params;
        const db = getDb();
        const document = await db.collection('products').findOne({_id:new ObjectId(id)});
        return res.status(200).json({document})
    } catch (error) {
        console.log(error)
    }
})

app.put('/update-product/:id', async (req, res) => {
    try {
        const db = getDb();
        const productId = req.params.id;

        let { title, price, description, imageUrl } = req.body;

        let result = await db.collection('products').updateOne(
            { _id: new ObjectId(productId) },   // filter
            { $set: { title, price, description, imageUrl } } // updated values
        )

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Product not found" })
        }

        res.status(200).json({ message: "Product updated successfully" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update product" })
    }
})

app.delete('/delete-product/:id',async(req,res)=>{
    try {
        const db = getDb();
        const productId = req.params.id;
        let result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete product" })
    }
})

app.post('/register',async(req,res)=>{
    let{name,email,password} = req.body;
    let p1 = new User(name,email,password);
    let result = await p1.save();
    res.status(200).json({ result });
})

app.post('/find-user',async(req,res)=>{
    try {
        let {userId} = req.body;
        const foundUser = await User.findUserById(userId);
        res.status(200).json({ foundUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to find the user" })
    }
})

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
});
