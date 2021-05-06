const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true
		},
		products: [
			{
				details: {
					type: mongoose.Types.ObjectId,
					required: true,
					ref: 'Product'
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
);

CartSchema.plugin(uniqueValidator, { message: 'already exists.' });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { Cart };
