let express = require('express')
let app = express();
require('dotenv').config()
let mongoConnect = require('./database/db.js')
let PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.status(200).send("Request received")
})



mongoConnect(client=>{
    // console.log(client)
    app.listen(PORT,()=>{
        console.log(`server is listening on ${PORT}`)
    })
})