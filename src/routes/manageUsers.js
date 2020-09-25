const router = require('express').Router()
const usersController = require('../controllers/usersController')

// const uploadHelper = require('../helpers/upload')

router.post('/', usersController.create)
router.get('/', usersController.getAll)
// router.get('/:id', getDetailUser)
// router.put('/:id', updateUser)
// router.patch('/:id', updateUserPartial)
// router.delete('/:id', deleteUser)

module.exports = router
