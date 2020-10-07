const transactionModel = require('../models/transactionModel')
const cartModel = require('../models/cartModel')
const usersAddressModel = require('../models/usersAddressModel')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')

module.exports = {
  create: async (req, res) => {
    const { id: userId } = req.data
    // transaction_id, user_id, product_name, price, quantity, total_price, delivery_fee, summary
    const cart = await cartModel.getAllModel(userId)
    if (cart.length) {
      const delivery = 10000
      // let results = cart.map(item => {
      //   item = {
      //     transaction_id: 'SHOPID' + Date.now(),
      //     seller_id: item.seller_id,
      //     user_id: item.user_id,
      //     product_name: item.name,
      //     price: item.price,
      //     quantity: item.quantity,
      //     total_price: item.total,
      //     delivery_fee: delivery
      //   }
      //   return item
      // })
      // const summary = results.map(item => {
      //   return item.total_price
      // }).reduce((a, b) => a + b + delivery)
      // results = results.map(item => {
      //   item = {
      //     ...item,
      //     summary: summary
      //   }
      //   return item
      // })
      const results = cart.map(item => {
        item = {
          transaction_id: 'SHOPID' + Date.now(),
          seller_id: item.seller_id,
          user_id: item.user_id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          total_price: item.total,
          delivery_fee: delivery,
          summary: [item.total, delivery].reduce((a, b) => a + b)
        }
        return item
      })
      const address = await usersAddressModel.getPrimaryModel(userId)
      if (address.length) {
        const checkoutMap = results.map(async cart => {
          const co = await transactionModel.createModel(cart)
          return co
        })

        const checkout = await Promise.all(checkoutMap)
        if (checkout.length) {
          const deleteCart = await cartModel.deleteAllModel(userId)
          if (deleteCart.affectedRows) {
            return responseStandard(res, 'Checkout successfully', { address, results })
          } else {
            return responseStandard(res, 'Failed to checkout', {}, 500, false)
          }
        } else {
          return responseStandard(res, 'Failed to checkout', {}, 500, false)
        }
      } else {
        return responseStandard(res, 'You haven\'t set you address', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'You don\'t have product in cart', {}, 400, false)
    }
  },
  get: async (req, res) => {
    const { searchKey, searchValue } = searching.transaction(req.query.search)
    const count = await transactionModel.countModel([searchKey, searchValue])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await transactionModel.getModel([searchKey, searchValue], [limit, offset])
    if (results.length) {
      const data = results.map(item => {
        item = {
          id: item.id,
          transaction_id: item.transaction_id,
          store: item.store,
          quantity: item.quantity,
          summary: item.summary
        }
        return item
      })
      return responseStandard(res, 'My Order', { data: data, pageInfo })
    } else {
      return responseStandard(res, 'There is no data in list', {}, 404, false)
    }
  },
  detail: async (req, res) => {
    const { id: userId } = req.data
    const { id } = req.params

    const detail = await transactionModel.detailModel([userId, id])
    if (detail.length) {
      return responseStandard(res, 'Detail Order', { detail })
    } else {
      return responseStandard(res, 'Not found', {}, 404, false)
    }
  }
}
