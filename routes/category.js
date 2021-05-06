const express = require('express');
const router = express.Router();
const { extend } = require('lodash');
const { Category } = require('../models');

router
	.route('/')
	.get(async (req, res) => {
		const categories = await Category.find({ isDeleted: false });
		res.json({
			success: true,
			categories
		});
	})

	.post(async (req, res) => {
		try {
			const category = req.body;
			const newCategory = Category(category);
			const savedCategory = await newCategory.save();
			res.status(201).json({
				success: true,
				message: 'Added category successfully.',
				category: savedCategory
			});
		} catch (error) {
			res.status(400).json({ success: false, message: error.message });
		}
	});

router.param('categoryId', async (req, res, next, id) => {
	try {
		const category = await Category.findById(id);
		if (!category) {
			throw new Error('Category not found.');
		}

		req.category = category;
		next();
	} catch (error) {
		res.status(404).json({ success: false, message: error.message });
	}
});

router
	.route('/:categoryId')
	.get((req, res) => {
		const { category } = req;
		res.json({ success: true, category });
	})

	.put(async (req, res, next) => {
		try {
			let { category } = req;
			const updatedCategory = req.body;

			category = extend(category, updatedCategory);
			category = await category.save();
			res.json({
				success: true,
				message: 'Updated category successfully.',
				category
			});
		} catch (error) {
			next(error);
		}
	})

	.delete(async (req, res, next) => {
		try {
			let { category } = req;
			category.isDeleted = true;
			category = await category.save();

			res.json({
				success: true,
				message: 'Deleted category successfully.',
				category
			});
		} catch (error) {
			next(error);
		}
	});

module.exports = { router };
