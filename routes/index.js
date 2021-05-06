const express = require('express');
const router = express.Router();

const { router: categoryRouter } = require('./category');
const { router: productRouter } = require('./product');
const { router: userRouter } = require('./user');
const { router: cartRouter } = require('./cart');
const { router: wishlistRouter } = require('./wishlist');

router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('/wishlists', wishlistRouter);

router.get('/', (req, res) => {
	console.log('Server is up and running.');
	res.json({ success: true, message: 'Server is up and running.' });
});

module.exports = { router };
