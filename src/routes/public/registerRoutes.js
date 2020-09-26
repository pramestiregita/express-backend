const router = require('express').Router()
const usersController = require('../../controllers/usersController')

router.post('/', usersController.create) // users and user_details

module.exports = router
