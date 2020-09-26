const router = require('express').Router()
const rolesController = require('../controllers/rolesController')
const usersController = require('../controllers/usersController')

// roles
router.post('/roles', rolesController.create) // add roles
router.get('/roles', rolesController.getRoles) // show roles
router.get('/roles/:id', rolesController.detailRole) // show detail roles
router.put('/roles/:id', rolesController.changeName) // edit roles
router.delete('/roles/:id', rolesController.deleteRole) // delete roles

// users
router.get('/users/', usersController.getAll) // users
router.get('/users/:id', usersController.getDetailForAdmin) // users
router.delete('/users/:id', usersController.deleteUserForAdmin) // users

module.exports = router
