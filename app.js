let express = require("express");
let app = express();
require("dotenv").config();
let { mongoConnect, getDb } = require("./database/db.js");
let PORT = process.env.PORT;
let Product = require("./models/product.js");

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

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
  });
});
