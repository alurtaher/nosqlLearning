const { getDb } = require('../database/db.js');
const { ObjectId } = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    async save() {
        try {
            const db = getDb();
            return await db.collection('products').insertOne(this);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    }

    static async findAll() {
        try {
            const db = getDb();
            return await db.collection('products').find().toArray();
        } catch (error) {
            console.error("Error finding products:", error);
        }
    }

    static async findById(productId) {
        try {
            const db = getDb();
            return await db.collection('products').findOne({ _id: new ObjectId(productId) });
        } catch (error) {
            console.error("Error finding product:", error);
        }
    }

    static async update(productId, updatedData) {
        try {
            const db = getDb();
            return await db.collection('products').updateOne(
                { _id: new ObjectId(productId) },
                { $set: updatedData }
            );
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    static async delete(productId) {
        try {
            const db = getDb();
            return await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

module.exports = Product;
