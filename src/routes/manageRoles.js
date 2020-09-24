const router = require('express').Router()

const rolesController = require('../controllers/rolesController')

router.post('/', rolesController.create)
router.get('/', rolesController.getRoles)
router.put('/:id', rolesController.changeName)

module.exports = router
