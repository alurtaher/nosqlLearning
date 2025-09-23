const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback =>{
    MongoClient.connect(process.env.MONGOURl)
    .then((client)=>{
        console.log("Mongo DB connected")
        callback(client)
    })
    .catch(err=>console.log(err))
}

module.exports = mongoConnect