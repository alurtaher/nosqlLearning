const getDb =  require('../database/db.js').getDb;
const {ObjectId} = require('mongodb')

class User{
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save(){
        try {
            const db = getDb();
            let result = await db.collection('users').insertOne(this);
            return result;
        } catch (error) {
            console.log(error)
        }
    }
    static async findUserById(userId) {
        try {
            const db = getDb();
            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User;