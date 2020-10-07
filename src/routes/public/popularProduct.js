const router = require('express').Router()
const popularProdController = require('../../controllers/popularProductsController')

router.get('/', popularProdController.getProducts) // show new product
router.get('/:id', popularProdController.detailProduct) // show detail product

module.exports = router
