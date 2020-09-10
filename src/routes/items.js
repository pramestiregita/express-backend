const { Router } = require('express')
const { createItem, getItem, getDetailItem, updateItem, updateItemPartial, deleteItem } = require('../controllers/items')

const router = Router()

router.post('/', createItem)
router.get('/', getItem)
router.get('/:id', getDetailItem)
router.put('/:id', updateItem)
router.patch('/:id', updateItemPartial)
router.delete('/:id', deleteItem)

module.exports = router
