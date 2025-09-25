const { getDb } = require('../database/db.js');
const { ObjectId } = require('mongodb');

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            const db = getDb();
            const result = await db.collection('users').insertOne(this);
            return result;
        } catch (error) {
            console.error("Error saving user:", error);
        }
    }

    static async findById(userId) {
        try {
            const db = getDb();
            return await db.collection('users').findOne({ _id: new ObjectId(userId) });
        } catch (error) {
            console.error("Error finding user:", error);
        }
    }
}

module.exports = User;