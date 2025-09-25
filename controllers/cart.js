const Cart = require('../models/cart.js');
const asyncHandler = require('../utils/asyncHandler');

let addItem = async (req, res) => {
    let { userId, productId, quantity } = req.body;
    let cart = new Cart(userId);
    let result = await cart.addItem(productId, quantity);
    res.status(200).json({ result });
};

let removeItem = async (req, res) => {
    let { userId, productId } = req.body;
    let cart = new Cart(userId);
    let result = await cart.removeItem(productId);
    res.status(200).json({ result });
};

let cartById = async (req, res) => {
    let cart = await Cart.findByUserId(req.params.userId);
    res.status(200).json({ cart });
};

module.exports = {
    addItem: asyncHandler(addItem),
    removeItem: asyncHandler(removeItem),
    cartById: asyncHandler(cartById)
};