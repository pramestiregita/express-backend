const { Router } = require('express')
const { createCart, getCart, getDetailCart, deleteCart } = require('../controllers/cart')

const router = Router()

router.post('/', createCart)
router.get('/', getCart)
router.get('/:id', getDetailCart)
router.delete('/:id', deleteCart)

module.exports = router
