const Product = require('../models/product.js');
const asyncHandler = require('../utils/asyncHandler');

let addProduct = async (req, res) => {
    let { title, price, description, imageUrl } = req.body;
    let product = new Product(title, price, description, imageUrl);
    let result = await product.save();
    res.status(200).json({ result });
};

let getAllProducts = async (req, res) => {
    let products = await Product.findAll();
    res.status(200).json({ products });
};

let getProductById = async (req, res) => {
    let product = await Product.findById(req.params.id);
    res.status(200).json({ product });
};

let updateProduct = async (req, res) => {
    let result = await Product.update(req.params.id, req.body);
    res.status(200).json({ result });
};

let deleteProduct = async (req, res) => {
    let result = await Product.delete(req.params.id);
    res.status(200).json({ result });
};

module.exports = {
    addProduct: asyncHandler(addProduct),
    getAllProducts: asyncHandler(getAllProducts),
    getProductById: asyncHandler(getProductById),
    updateProduct: asyncHandler(updateProduct),
    deleteProduct: asyncHandler(deleteProduct)
};