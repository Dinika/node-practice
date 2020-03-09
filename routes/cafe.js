const express = require('express')
const cafeController = require('../controllers/cafe')

const router = express.Router()


router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', cafeController.getProducts)
router.get('/products', cafeController.getProducts2)
router.get('/cart', cafeController.getCart)
router.post('/cart', cafeController.postCart)
router.get('/orders', cafeController.orders)
router.get('/product/:productId', cafeController.getProduct)
module.exports = router