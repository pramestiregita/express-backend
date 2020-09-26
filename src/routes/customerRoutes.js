const router = require('express').Router()
const usersController = require('../controllers/usersController')

// user detail
router.get('/detail', usersController.getDetailUser) // users
router.put('/edit', usersController.updateUser) // users and user_details
router.delete('/delete', usersController.deleteUser) // users

module.exports = router
