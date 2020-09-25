const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.post('/', usersController.create)
router.get('/', usersController.getAll)
router.get('/:id', usersController.getDetailUser)
// router.put('/:id', updateUser)
// router.patch('/:id', updateUserPartial)
// router.delete('/:id', deleteUser)

module.exports = router
