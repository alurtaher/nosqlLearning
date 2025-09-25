const { getDb } = require('../database/db.js');
const { ObjectId } = require('mongodb');

class Cart {
    constructor(userId, items = []) {
        this.userId = new ObjectId(userId);
        this.items = items; // [{ productId, quantity }]
    }

    async save() {
        try {
            const db = getDb();
            return await db.collection('carts').insertOne(this);
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    }

    static async findByUserId(userId) {
        try {
            const db = getDb();
            return await db.collection('carts').findOne({ userId: new ObjectId(userId) });
        } catch (error) {
            console.error("Error finding cart:", error);
        }
    }

    async addItem(productId, quantity = 1) {
        try {
            const db = getDb();
            return await db.collection('carts').updateOne(
                { userId: this.userId },
                { $push: { items: { productId: new ObjectId(productId), quantity } } }
            );
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    async removeItem(productId) {
        try {
            const db = getDb();
            return await db.collection('carts').updateOne(
                { userId: this.userId },
                { $pull: { items: { productId: new ObjectId(productId) } } }
            );
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }
}

module.exports = Cart;