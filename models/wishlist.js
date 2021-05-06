const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const WishListSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true
		},
		products: [
			{
				type: mongoose.Types.ObjectId,
				required: true,
				ref: 'Product'
			}
		]
	},
	{
		timestamps: true
	}
);

WishListSchema.plugin(uniqueValidator, { message: 'already exists.' });

const WishList = mongoose.model('Wishlist', WishListSchema);

module.exports = { WishList };
