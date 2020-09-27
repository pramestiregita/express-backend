const router = require('express').Router()
const productController = require('../../controllers/productController')

router.get('/', productController.getProducts) // show product
router.get('/:id', productController.detailProduct) // show detail product

module.exports = router
