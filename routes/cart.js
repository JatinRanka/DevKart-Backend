const express = require('express');
const router = express.Router();
const { Cart } = require('../models');

router.param('userId', async (req, res, next, id) => {
	req.userId = id;
	next();
});

router.get('/:userId', async (req, res, next) => {
	try {
		const { userId } = req;
		let cart = await Cart.findOne({ user: userId }).populate('products.details');

		if (!cart) {
			cart = { user: userId, products: [] };
			cart = new Cart(cart);
			cart = await cart.save();
		}

		res.json({
			success: true,
			cart
		});
	} catch (error) {
		next(error);
	}
});

router.post('/:userId', async (req, res, next) => {
	try {
		const { userId } = req;
		const { product: details, quantity } = req.body;
		let cart = await Cart.findOne({ user: userId });

		if (!cart) {
			cart = { user: userId, products: [] };
			cart = new Cart(cart);
			cart = await cart.save();
		}

		const product = cart.products.find((product) => product.details == details);
		let message;

		if (quantity === 0) {
			cart.products.pull(product);
			message = 'Product removed successfully.';
		} else {
			if (product) {
				product.quantity = quantity;
				message = 'Product updated successfully.';
			} else {
				cart.products.push({
					details,
					quantity
				});
				message = 'Product added successfully.';
			}
		}

		await cart.save();
		cart = await Cart.populate(cart, { path: 'products.details' });

		res.json({
			success: true,
			message,
			cart
		});
	} catch (error) {
		next(error);
	}
});

module.exports = { router };
