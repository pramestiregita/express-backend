const { Router } = require('express')
const { createCategory, getCategory, getDetailCategory, updateCategory, deleteCategory } = require('../controllers/category')

const router = Router()

router.post('/', createCategory)
router.get('/', getCategory)
router.get('/:id', getDetailCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
