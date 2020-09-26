const route = require('express').Router()
const { authAdminController, authSellerController, authCustController } = require('../../controllers/authController')

route.post('/login/admin', authAdminController) // admin
route.post('/login/seller', authSellerController) // seller
route.post('/login/customer', authCustController) // customer

module.exports = route
