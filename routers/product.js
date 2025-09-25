const express = require('express');
const router = express.Router();
const product = require('../controllers/product')

// Add product
router.post("/add-product", product.addProduct);

// Get all products
router.get("/get-products", product.getAllProducts);

// Get product by ID
router.get("/get-product/:id", product.getProductById);

// Update product
router.put("/update-product/:id", product.updateProduct);

// Delete product
router.delete("/delete-product/:id", product.deleteProduct);

module.exports = router;