const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const productController = require('../controllers/productController')
const usersController = require('../controllers/usersController')
const cartsController = require('../controllers/cartsController')
const usersAddressController = require('../controllers/usersAddressController')
const upload = require('../helpers/upload')

// user detail
router.get('/detail', usersController.getDetailUser) // show user detail
router.put('/edit', upload.single('picture'), usersController.updateUser) // edit user detail
router.patch('/edit', usersController.updateUserPartial) // edit user email & password
router.patch('/edit/detail', usersController.updateDetailPartial) // edit user detail
router.patch('/edit/profile_picture', upload.single('picture'), usersController.updatePicture) // edit user profile_picture
router.delete('/delete', usersController.deleteUser) // delete user

// user address
router.post('/my-address', usersAddressController.createAddress) // create user address
router.get('/my-address', usersAddressController.getAllAddress) // show user address
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

module.exports = router
