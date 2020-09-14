const { Router } = require('express')
const { createCart, getCart, getDetailUserCart, updateQuantity, deleteCart } = require('../controllers/cart')

const router = Router()

router.post('/', createCart)
router.get('/', getCart)
router.get('/:id', getDetailUserCart)
router.patch('/:id', updateQuantity)
router.delete('/:id', deleteCart)

module.exports = router
