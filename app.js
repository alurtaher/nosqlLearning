const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { mongoConnect } = require("./database/db.js");
let PORT = process.env.PORT || 5000;
const user = require('./routers/user.js')
const product = require('./routers/product.js')
const cart = require('./routers/cart.js')
const errorHandler = require('./middleware/errorHandler.js');
 
//Routes
app.use('/user',user)
app.use('/product',product);
app.use('/cart',cart)

// Global error handler
app.use(errorHandler);

// ------------------ START SERVER ------------------
mongoConnect(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});