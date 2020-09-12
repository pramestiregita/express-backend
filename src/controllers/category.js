const qs = require('querystring')

const { createCategoryModel, getCategoryModel, countCategoryModel, getDetailModel, updateCategoryModel, deleteCategoryModel } = require('../models/category')

module.exports = {
  createCategory: (req, res) => {
    const { category } = req.body

    if (category) {
      createCategoryModel(category, result => {
        res.send({
          success: true,
          message: 'Category has been created',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      })
    } else {
      res.send({
        success: false,
        message: 'Please enter category name'
      })
    }
  },
  getCategory: (req, res) => {
    const { page = 1, limit = 5, search, sortBy } = req.query
    const searchKey = 'category_name'
    const searchValue = search || ''
    let sortByKey = ''
    let sortByValue = ''
    if (typeof sortBy === 'object') {
      sortByKey = Object.keys(sortBy)[0]
      sortByValue = Object.values(sortBy)[0]
    } else {
      sortByKey = 'category_id'
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

    getCategoryModel([searchKey, searchValue, limit, offset, sortByKey, sortByValue], result => {
      if (result.length) {
        countCategoryModel([searchKey, searchValue, limit, offset, sortByKey, sortByValue], data => {
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)

          const { pages, currentPage } = pageInfo

          if (currentPage < pages) {
            pageInfo.nextLink = `http://localhost:8080/category?${pageNext}`
          }

          if (currentPage > 1) {
            pageInfo.prevLink = `http://localhost:8080/category?${pagePrev}`
          }

          res.send({
            success: true,
            message: 'List of Category',
            data: result,
            pageInfo
          })
        })
      } else {
        res.send({
          success: false,
          message: 'There is no category in list'
        })
      }
    })
  },
  getDetailCategory: (req, res) => {
    const { id } = req.params

    getDetailModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: `Detail of id ${id}`,
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `Category with id ${id} is not found`
        })
      }
    })
  },
  updateCategory: (req, res) => {
    const { id } = req.params
    const { category } = req.body

    if (category) {
      getDetailModel(id, result => {
        if (result.length) {
          updateCategoryModel([category, id], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Category with id ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: `Failed to update category with id ${id}`
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `There is no category with id ${id}`
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'Please enter category name'
      })
    }
  },
  deleteCategory: (req, res) => {
    const { id } = req.params

    getDetailModel(id, result => {
      if (result.length) {
        deleteCategoryModel(id, result => {
          if (result.affectedRows) {
            res.send({
              success: true,
              message: `Category with id ${id} has been deleted`
            })
          } else {
            res.send({
              success: false,
              message: `Failed to delete category with id ${id}`
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `Category with id ${id} is not found`
        })
      }
    })
  }
}
