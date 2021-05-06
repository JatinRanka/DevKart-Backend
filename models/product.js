const mongoose = require('mongoose');
require('mongoose-type-url');

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Provide product name.']
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: 'Provide product category.'
		},
		brand: {
			type: String
		},
		price: {
			type: Number,
			required: [true, 'Provide product price.'],
			min: [0, 'Price should be minimum 1.']
		},
		image: {
			type: mongoose.SchemaTypes.Url,
			required: [true, 'Provide product image url.']
		},
		description: {
			type: String,
			required: [true, 'Provide product description'],
			minLength: [300, 'Description must be 300 characters or more']
		},
		inStock: {
			type: Boolean,
			default: true
		},
		fastDelivery: {
			type: Boolean,
			default: false
		},
		offer: {
			type: Number // in %
		},
		isDeleted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
