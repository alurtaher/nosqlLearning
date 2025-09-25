const User = require('../models/user.js');
const Cart = require('../models/cart.js');
const asyncHandler = require('../utils/asyncHandler');

let registerUser = async (req, res) => {
    let { name, email, password } = req.body;
    let user = new User(name, email, password);
    let result = await user.save();

    // create an empty cart for the new user
    let cart = new Cart(result.insertedId, []);
    await cart.save();

    res.status(200).json({ result, message: "User registered and cart created" });
};

let findUserById = async (req, res) => {
    let user = await User.findById(req.params.id);
    res.status(200).json({ user });
};

module.exports = {
    registerUser: asyncHandler(registerUser),
    findUserById: asyncHandler(findUserById)
};