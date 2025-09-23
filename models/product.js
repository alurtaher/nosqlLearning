const getDb =  require('../database/db.js').getDb;

class Product  {
    constructor(title,price,description,imageUrl){
        this.title = title,
        this.price = price,
        this.description = description,
        this.imageUrl = imageUrl
    }
    async save() {
        try {
            const db = getDb();
            let result = await db.collection('products').insertOne(this);
            // console.log('result is '+result)
            return result; 
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Product;