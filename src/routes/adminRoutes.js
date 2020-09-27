const router = require('express').Router()
const rolesController = require('../controllers/rolesController')
const usersController = require('../controllers/usersController')
const categoriesController = require('../controllers/categoriesController')
const productController = require('../controllers/productController')

// roles
router.post('/roles', rolesController.create) // add roles
router.get('/roles', rolesController.getRoles) // show roles
router.get('/roles/:id', rolesController.detailRole) // show detail roles
router.put('/roles/:id', rolesController.changeName) // edit roles
router.delete('/roles/:id', rolesController.deleteRole) // delete roles

// users
router.post('/users', usersController.createAdmin) // users
router.get('/users', usersController.getAll) // users
router.get('/users/:id', usersController.getDetailForAdmin) // users
router.delete('/users/:id', usersController.deleteUserForAdmin) // users

// categories
router.post('/category', categoriesController.create) // add category
router.get('/category', categoriesController.getCategories) // show category
router.get('/category/:id', categoriesController.detailCategory) // show detail category
router.put('/category/:id', categoriesController.changeName) // edit category
router.delete('/category/:id', categoriesController.deleteRole) // delete category

// product
router.post('/', productController.create) // add product
router.post('/color', productController.createColor) // add product
router.get('/', productController.getProducts) // show product
router.get('/:id', productController.detailProduct) // show detail product
router.put('/:id', productController.updateProduct) // edit product
router.delete('/:id', productController.deleteProduct) // delete product

module.exports = router
