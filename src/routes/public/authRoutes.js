const router = require('express').Router()
const { authAdminController, authSellerController, authCustController } = require('../../controllers/authController')
const usersController = require('../../controllers/usersController')

// login
router.post('/login/admin', authAdminController) // admin
router.post('/login/seller', authSellerController) // seller
router.post('/login/customer', authCustController) // customer

// register
router.post('/register/seller', usersController.createStore) // seller
router.post('/register/customer', usersController.create) // customer

module.exports = router
