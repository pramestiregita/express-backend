const Router = require('express')
const { createUser, getUsers, getDetailUser, updateUser, updateUserPartial, deleteUser } = require('../controllers/users')

const uploadHelper = require('../helpers/upload')

const router = Router()

router.post('/', uploadHelper.single('picture'), createUser)
router.get('/', getUsers)
router.get('/:id', getDetailUser)
router.put('/:id', updateUser)
router.patch('/:id', updateUserPartial)
router.delete('/:id', deleteUser)

module.exports = router
