const router = require('express').Router()
const categoriesController = require('../../controllers/categoriesController')

// categories
router.get('/', categoriesController.getCategories)
router.get('/:id', categoriesController.detailCategory)

module.exports = router
