const router = require('express').Router()
const userDetailsController = require('../controllers/userDetailsController')

// const uploadHelper = require('../helpers/upload')

router.post('/', userDetailsController.create)
router.get('/', userDetailsController.getAll)
router.get('/:id', userDetailsController.getDetail)
// router.put('/:id', updateUser)
// router.patch('/:id', updateUserPartial)
// router.delete('/:id', deleteUser)

module.exports = router
