const qs = require('querystring')
const responseStandard = require('../helpers/response')

const { createCartModel, getCartModel, getCartCountModel, getDetailUserCartModel, getDetailCartModel, updateQuantityModel, deleteCartModel } = require('../models/cart')
const { getDetailUserModel } = require('../models/users')
const { getDetailModel } = require('../models/items')

module.exports = {
  createCart: (req, res) => {
    const { userId, itemId, quantity } = req.body

    if (userId && itemId && quantity) {
      getDetailUserModel(userId, result => {
        if (result.length) {
          getDetailModel(itemId, result => {
            if (result.length) {
              createCartModel([userId, itemId, quantity], result => {
                const data = {
                  id: result.insertId,
                  user_id: userId,
                  item_id: itemId,
                  quantity
                }
                return responseStandard(res, 201, 'Cart has been created', { data })
              })
            } else {
              return responseStandard(res, 404, `Item with id ${itemId} is not found`, {}, false)
            }
          })
        } else {
          return responseStandard(res, 404, `User with id ${userId} is not found`, {}, false)
        }
      })
    } else {
      return responseStandard(res, 400, 'All field must be filled', {}, false)
    }
  },
  getCart: (req, res) => {
    const { page = 1, limit = 5, search, sortBy } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'user_id'
      searchValue = search || ''
    }
    let sortByKey = ''
    let sortByValue = ''
    if (typeof sortBy === 'object') {
      sortByKey = Object.keys(sortBy)[0]
      sortByValue = Object.values(sortBy)[0]
    } else {
      sortByKey = 'id'
      sortByValue = sortBy || 'asc'
    }
    const offset = (page - 1) * limit

    const pageInfo = {
      count: 0,
      pages: 0,
      currentPage: parseInt(page),
      limitPerPage: parseInt(limit),
      nextLink: null,
      prevLink: null
    }

    const pageNext = qs.stringify({ ...req.query, ...{ page: page + 1 } })
    const pagePrev = qs.stringify({ ...req.query, ...{ page: page - 1 } })

    getCartModel([searchKey, searchValue, limit, offset, sortByKey, sortByValue], result => {
      if (result.length) {
        getCartCountModel([searchKey, searchValue, sortByKey, sortByValue], data => {
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)

          const { pages, currentPage } = pageInfo

          if (currentPage < pages) {
            pageInfo.nextLink = `http://localhost:8080/items?${pageNext}`
          }

          if (currentPage > 1) {
            pageInfo.prevLink = `http://localhost:8080/items?${pagePrev}`
          }

          return responseStandard(res, 200, 'List of Cart', { data: result, pageInfo })
        })
      } else {
        return responseStandard(res, 404, 'There is no item in list', {}, false)
      }
    })
  },
  getDetailUserCart: (req, res) => {
    const { id } = req.params
    getDetailUserCartModel(id, result => {
      if (result.length) {
        return responseStandard(res, 200, `Detail cart of user id ${id}`, { data: result })
      } else {
        return responseStandard(res, 404, `Cart with user id ${id} is not found`, {}, false)
      }
    })
  },
  updateQuantity: (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
    const data = parseInt(quantity)
    getDetailCartModel(id, result => {
      if (result.length) {
        if (quantity) {
          if (data > 0) {
            updateQuantityModel([data, id], result => {
              if (result.affectedRows) {
                return responseStandard(res, 200, `Cart with id ${id} has been updated`)
              } else {
                return responseStandard(res, 500, 'Failed to update cart', {}, false)
              }
            })
          } else {
            deleteCartModel(id, result => {
              if (result.affectedRows) {
                return responseStandard(res, 200, `Cart with id ${id} has been deleted`)
              } else {
                return responseStandard(res, 500, 'Failed to delete cart', {}, false)
              }
            })
          }
        } else {
          return responseStandard(res, 400, 'Please insert quantity', {}, false)
        }
      } else {
        return responseStandard(res, 404, `Cart with id ${id} is not found`, {}, false)
      }
    })
  },
  deleteCart: (req, res) => {
    const { id } = req.params
    getDetailCartModel(id, result => {
      if (result.length) {
        deleteCartModel(id, result => {
          if (result.affectedRows) {
            return responseStandard(res, 200, `Cart with id ${id} has been deleted`)
          } else {
            return responseStandard(res, 500, 'Failed to delete cart', {}, false)
          }
        })
      } else {
        return responseStandard(res, 404, `Cart with id ${id} is not found`, {}, false)
      }
    })
  }
}
