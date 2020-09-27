const router = require('express').Router()
const { authAdminController, authSellerController, authCustController } = require('../../controllers/authController')
const usersController = require('../../controllers/usersController')
const storesController = require('../../controllers/storesController')

const upload = require('../../helpers/upload')

// login
router.post('/login/admin', authAdminController) // admin
router.post('/login/seller', authSellerController) // seller
router.post('/login/customer', authCustController) // customer

// register
router.post('/register/seller', storesController.createStore) // seller
router.post('/register/customer', upload.single('picture'), usersController.create) // customer

module.exports = router
