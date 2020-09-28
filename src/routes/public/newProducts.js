const router = require('express').Router()
const newProdController = require('../../controllers/newProductsController')

router.get('/', newProdController.getProducts) // show new product
router.get('/:id', newProdController.detailProduct) // show detail product

module.exports = router
