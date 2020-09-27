const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const productController = require('../controllers/productController')
const usersController = require('../controllers/usersController')

// user detail
router.get('/detail', usersController.getDetailUser) // show user detail
router.put('/edit', usersController.updateUser) // edit user detail
router.delete('/delete', usersController.deleteUser) // delete user

// categories
router.get('/category', categoriesController.getCategories) // show categories
router.get('/category/:id', categoriesController.detailCategory) // show detail category

// products
router.get('/product', productController.getProducts) // show products
router.get('/product/:id', productController.detailProduct) // show detail product

module.exports = router
