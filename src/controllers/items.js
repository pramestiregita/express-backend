const qs = require('querystring')

const { createItemModel, getItemModel, searchItemModel, getDetailModel, updateItemModel, updatePartialModel, deleteItemModel } = require('../models/items')

module.exports = {
  createItem: (req, res) => {
    const { name, price, description } = req.body
    if (name && price && description) {
      createItemModel([name, price, description], result => {
        res.status(201).send({
          success: true,
          message: 'Item has been created',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      })
      //   if (result.length) {
      //     res.status(201).send({
      //       success: true,
      //       message: 'Item has been created',
      //       data: {
      //         id: result.insertId,
      //         ...req.body
      //       }
      //     })
      //   } else {
      //     res.status(500).send({
      //       success: false,
      //       message: 'Internal Server Error'
      //     })
      //   }
      // })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled!'
      })
    }
  },
  getItem: (req, res) => {
    let { page, limit, search } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit

    getItemModel([searchKey, searchValue, limit, offset], result => {
      const pageInfo = {
        count: 0,
        pages: 0,
        currentPage: page,
        limitPerPage: limit,
        nextLink: null,
        prevLink: null
      }
      if (result.length) {
        searchItemModel([searchKey, searchValue], data => {
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)

          const { pages, currentPage } = pageInfo

          if (currentPage < pages) {
            pageInfo.nextLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
          }

          if (currentPage > 1) {
            pageInfo.prevLink = `http://localhost:8080/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
          }

          res.send({
            success: true,
            message: 'List of items',
            data: result,
            pageInfo
          })
        })
      } else {
        res.send({
          success: true,
          message: 'There is no item in list',
          pageInfo
        })
      }
    })
  },
  getDetailItem: (req, res) => {
    const { id } = req.params
    getDetailModel(id, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: `Detail of id ${id}`,
          data: result
        })
      } else {
        res.status(201).send({
          success: false,
          message: `Item with id ${id} is not found`
        })
      }
    })
  },
  updateItem: (req, res) => {
    const { id } = req.params
    const { name, price, description } = req.body
    if (name.trim() && price.trim() && description.trim()) {
      getDetailModel(id, result => {
        if (result.length) {
          updateItemModel([name, price, description, id], result => {
            if (result.affectedRows) {
              res.status(201).send({
                success: true,
                message: `Item with id ${id} has been updated`
              })
            } else {
              res.status(500).send({
                success: false,
                message: 'Failed to update'
              })
            }
          })
        } else {
          res.status(500).send({
            success: false,
            message: `Item with id ${id} is not found`
          })
        }
      })
    } else {
      res.status(500).send({
        success: false,
        message: 'All fields must be filled'
      })
    }
  },
  updateItemPartial: (req, res) => {
    const { id } = req.params
    const data = Object.entries(req.body).map(item => {
      return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
    })
    if (data.length) {
      getDetailModel(id, result => {
        if (result.length) {
          updatePartialModel([data, id], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Item with id ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed to update'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Item with id ${id} is not found`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'At least 1 field must be filled'
      })
    }
  },
  deleteItem: (req, res) => {
    const { id } = req.params
    getDetailModel(id, result => {
      if (result.length) {
        deleteItemModel(id, result => {
          if (result.affectedRows) {
            res.status(201).send({
              success: true,
              message: 'Item has been deleted'
            })
          } else {
            res.status(500).send({
              success: false,
              message: 'Failed to delete item'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Item with id ${id} is not found`
        })
      }
    })
  }
}
