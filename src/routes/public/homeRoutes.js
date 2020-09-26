const router = require('express').Router()
const categoriesController = require('../../controllers/categoriesController')

// categories
router.get('/category', categoriesController.getCategories)
router.get('/category/:id', categoriesController.detailCategory)

module.exports = router
