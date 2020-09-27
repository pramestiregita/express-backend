const router = require('express').Router()
const usersController = require('../controllers/usersController')
const productController = require('../controllers/productController')
const storesController = require('../controllers/storesController')

// user detail
router.get('/detail', usersController.getDetailUser) // users
router.put('/edit', usersController.updateUser) // users and user_details
router.delete('/delete', usersController.deleteUser) // users

// stores
router.put('/store', storesController.updateStore) // update store detail

// products
router.post('/product', productController.create) // add product
router.post('/product/color', productController.createColor) // add product
router.get('/product', productController.getSellerProducts) // show product
router.get('/product/:id', productController.detailSellerProduct) // show detail product
router.put('/product/:id', productController.updateProduct) // edit product
router.put('/product/color/:id', productController.updateColorProduct) // edit product
router.delete('/product/:id', productController.deleteProduct) // delete product

module.exports = router
