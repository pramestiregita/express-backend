const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const productController = require('../controllers/productController')
const usersController = require('../controllers/usersController')
const cartsController = require('../controllers/cartsController')
const upload = require('../helpers/upload')

// user detail
router.get('/detail', usersController.getDetailUser) // show user detail
router.put('/edit', upload.single('picture'), usersController.updateUser) // edit user detail
router.delete('/delete', usersController.deleteUser) // delete user

// categories
router.get('/category', categoriesController.getCategories) // show categories
router.get('/category/:id', categoriesController.detailCategory) // show detail category

// products
router.get('/product', productController.getProducts) // show products
router.get('/product/:id', productController.detailProduct) // show detail product

// cart
router.post('/cart', cartsController.create) // add cart
router.get('/cart', cartsController.getAll) // show cart
router.put('/cart/:id', cartsController.editCart) // edit cart
router.delete('/cart/:id', cartsController.deleteCart) // delete cart

module.exports = router
