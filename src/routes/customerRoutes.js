const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const productController = require('../controllers/productController')
const usersController = require('../controllers/usersController')
const cartsController = require('../controllers/cartsController')
const usersAddressController = require('../controllers/usersAddressController')
const productRatingController = require('../controllers/productRatingController')
const transactionController = require('../controllers/transactionController')

// user detail
router.get('/detail', usersController.getDetailUser) // show user detail
router.put('/edit', usersController.updateUser) // edit user detail
// router.patch('/edit', usersController.updatePartial) // edit user email & password
router.patch('/edit', usersController.updateDetail) // edit user detail
router.patch('/change-password', usersController.updatePassword) // edit user password
router.patch('/edit/avatar', usersController.updatePict) // edit user email & password
router.delete('/delete', usersController.deleteUser) // delete user

// user address
router.post('/my-address', usersAddressController.createAddress) // create user address
router.get('/my-address', usersAddressController.getAllAddress) // show user address
router.get('/primary-address', usersAddressController.getPrimaryAddress) // show user address
router.get('/my-address/:id', usersAddressController.detailAddress) // show detail user address
router.put('/my-address/:id', usersAddressController.updateAll) // update all detail user address
router.patch('/my-address/:id', usersAddressController.updatePartial) // update partial detail user address
router.delete('/my-address/:id', usersAddressController.deleteAddress) // delete detail user address

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

// product ratings
router.post('/give-rating/:id', productRatingController.create) // give rating

// checkout
router.post('/checkout', transactionController.create)
router.get('/my-order', transactionController.get)
router.get('/my-order/:id', transactionController.detail)

module.exports = router
