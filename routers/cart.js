const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.js')

router.post("/add-item", cartController.addItem);

router.post("/remove-item", cartController.removeItem);

router.get("/:userId", cartController.cartById);

module.exports = router;