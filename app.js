let express = require('express')
let app = express();
require('dotenv').config()
let {mongoConnect} = require('./database/db.js')
let PORT = process.env.PORT
let Product = require('./models/product.js')

app.use(express.json())

app.post('/add-product',(req,res)=>{
    let {title,price,description,imageUrl} = req.body;
    let p1 = new Product(title,price,description,imageUrl)
    let result = p1.save();
    res.status(200).json({result})
})

mongoConnect(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on ${PORT}`)
    })
})