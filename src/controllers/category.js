const qs = require('querystring')
const responseStandard = require('../helpers/response')

const { createCategoryModel, getCategoryModel, countCategoryModel, getDetailModel, updateCategoryModel, deleteCategoryModel } = require('../models/category')

module.exports = {
  createCategory: (req, res) => {
    const { category } = req.body

    if (category) {
      createCategoryModel(category, result => {
        const data = {
          id: result.insertId,
          category_name: category
        }
        return responseStandard(res, 201, 'Category has been created', { data })
      })
    } else {
      return responseStandard(res, 400, 'Please enter category name', {}, false)
    }
  },
  getCategory: (req, res) => {
    const { page = 1, limit = 50, search, sortBy } = req.query
    const searchKey = 'category_name'
    const searchValue = search || ''
    let sortByKey = ''
    let sortByValue = ''
    if (typeof sortBy === 'object') {
      sortByKey = Object.keys(sortBy)[0]
      sortByValue = Object.values(sortBy)[0]
    } else {
      sortByKey = 'category_name'
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

          return responseStandard(res, 200, 'List of Category', { data: result, pageInfo })
        })
      } else {
        return responseStandard(res, 404, 'There is no category in list', {}, false)
      }
    })
  },
  getDetailCategory: (req, res) => {
    const { id } = req.params

    getDetailModel(id, result => {
      if (result.length) {
        const item = result.map(item => {
          return {
            name: item.name,
            price: item.price,
            description: item.description
          }
        })
        const data = {
          category_id: result[0].category_id,
          category_name: result[0].category_name,
          items: item
        }
        return responseStandard(res, 200, 'Detail of Category', { data })
      } else {
        return responseStandard(res, 404, `Category with id ${id} is not found`, {}, false)
      }
    })
  },
  updateCategory: (req, res) => {
    const { id } = req.params
    const { category } = req.body

    if (category.trim()) {
      getDetailModel(id, result => {
        if (result.length) {
          updateCategoryModel([category, id], result => {
            if (result.affectedRows) {
              return responseStandard(res, 200, `Category with id ${id} has been updated`)
            } else {
              return responseStandard(res, 400, `Failed to update category with id ${id}`, {}, false)
            }
          })
        } else {
          return responseStandard(res, 404, `There is no category with id ${id}`, {}, false)
        }
      })
    } else {
      return responseStandard(res, 400, 'Please enter category name', {}, false)
    }
  },
  deleteCategory: (req, res) => {
    const { id } = req.params

    getDetailModel(id, result => {
      if (result.length) {
        deleteCategoryModel(id, result => {
          if (result.affectedRows) {
            return responseStandard(res, 200, `Category with id ${id} has been deleted`)
          } else {
            return responseStandard(res, 500, `Failed to delete category with id ${id}`, {}, false)
          }
        })
      } else {
        return responseStandard(res, 404, `Category with id ${id} is not found`, {}, false)
      }
    })
  }
}
