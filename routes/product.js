const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const { Product } = require('../models');

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const products = await Product.find({ isDeleted: false });
			res.json({ success: true, products });
		} catch (error) {
			next(error);
		}
	})

	.post(async (req, res) => {
		try {
			const product = req.body;
			const newProduct = new Product(product);
			const savedProduct = await newProduct.save();

			res.status(201).json({
				success: true,
				message: 'Product created successfully.',
				product: savedProduct
			});
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	});

router.param('productId', async (req, res, next, id) => {
	try {
		const product = await Product.findById(id);
		if (!product) {
			throw new Error('Product not found.');
		}

		req.product = product;
		next();
	} catch (error) {
		res.status(404).json({ success: false, message: error.message });
	}
});

router
	.route('/:productId')
	.get((req, res) => {
		const { product } = req;
		res.json({ success: true, product });
	})

	.put(async (req, res, next) => {
		try {
			let { product } = req;
			const updatedproduct = req.body;

			product = extend(product, updatedproduct);
			product = await product.save();
			res.json({
				success: true,
				message: 'Updated product successfully.',
				product
			});
		} catch (error) {
			next(error);
		}
	})

	.delete(async (req, res, next) => {
		try {
			let { product } = req;
			product.isDeleted = true;
			product = await product.save();

			res.json({
				success: true,
				message: 'Deleted product successfully.',
				product
			});
		} catch (error) {
			next(error);
		}
	});

module.exports = { router };
