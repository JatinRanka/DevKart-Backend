const express = require('express');
const router = express.Router();
const { WishList } = require('../models');

router.param('userId', async (req, res, next, id) => {
	req.userId = id;
	next();
});

router.get('/:userId', async (req, res, next) => {
	try {
		const { userId } = req;
		let wishlist = await WishList.findOne({ user: userId }).populate('products');

		if (!wishlist) {
			wishlist = { user: userId, products: [] };
			wishlist = new WishList(wishlist);
			wishlist = await wishlist.save();
		}

		res.json({
			success: true,
			wishlist
		});
	} catch (error) {
		next(error);
	}
});

router.post('/:userId', async (req, res, next) => {
	try {
		const { userId } = req;
		const { product: productIdToUpdate, addInWishList } = req.body;
		let wishlist = await WishList.findOne({ user: userId });

		if (!wishlist) {
			wishlist = { user: userId, products: [] };
			wishlist = new WishList(wishlist);
			wishlist = await wishlist.save();
		}

		let product = wishlist.products.find(
			(product) => product._id == productIdToUpdate
		);

		let message;

		if (addInWishList && !product) {
			wishlist.products.push(productIdToUpdate);
			await wishlist.save();
			message = 'Product added in WishList.';
		}

		if (!addInWishList && product) {
			wishlist.products.pull(product);
			await wishlist.save();
			message = 'Product removed from WishList.';
		}

		wishlist = await WishList.populate(wishlist, { path: 'products' });

		res.json({
			success: true,
			message,
			wishlist
		});
	} catch (error) {
		next(error);
	}
});

module.exports = { router };
