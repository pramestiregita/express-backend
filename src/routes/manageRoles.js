const router = require('express').Router()

const rolesController = require('../controllers/rolesController')

router.post('/', rolesController.create)
router.get('/', rolesController.getRoles)
router.get('/:id', rolesController.detailRole)
router.put('/:id', rolesController.changeName)
router.delete('/:id', rolesController.deleteRole)

module.exports = router
