const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.post('/', usersController.create)
router.get('/', usersController.getAll)
router.get('/detail/:id', usersController.getDetailUser)
// router.delete('/:id', usersController.deleteUser)

module.exports = router
