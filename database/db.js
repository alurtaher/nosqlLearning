const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
    MongoClient.connect(process.env.MONGOURL)
    .then(client => {
        console.log("MongoDB connected ");
        _db = client.db('test'); // choose your db name
        callback();
    })
    .catch(err => {
        console.error("MongoDB connection failed ", err);
    });
};

const getDb = () => {
    if (_db) return _db;
    throw new Error('No Database Found');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;