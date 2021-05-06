const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Provide category name']
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

const Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };
