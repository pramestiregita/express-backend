const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.post('/', usersController.create) // users and user_details
router.get('/', usersController.getAll) // users
router.get('/detail/:id', usersController.getDetailUser) // users
router.put('/:id', usersController.updateUser) // users and user_details
router.delete('/:id', usersController.deleteUser) // users

module.exports = router
