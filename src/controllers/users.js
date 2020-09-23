const qs = require('querystring')
const responseStandard = require('../helpers/response')

const { createUserModels, getUsersModel, getCountModel, getDetailUserModel, updateUserModel, updatePartialModel, deleteUserModel } = require('../models/users')

module.exports = {
  createUser: (req, res) => {
    const { name, email, phoneNumber, gender, dateOfBirth } = req.body
    const picture = `/uploads/${req.file.filename}`

    if (name && email && phoneNumber && gender && dateOfBirth) {
      createUserModels([name, email, phoneNumber, gender, dateOfBirth, picture], result => {
        const data = {
          id: result.insertId,
          name: name,
          email: email,
          phone_number: phoneNumber,
          gender: gender,
          date_of_birth: dateOfBirth,
          picture: picture
        }
        return responseStandard(res, 201, 'Success! User has been created', { data })
      })
    } else {
      return responseStandard(res, 400, 'All field must be filled', {}, false)
    }
  },
  getUsers: (req, res) => {
    const { page = 1, limit = 5, search, sortBy } = req.query
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
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

    getUsersModel([searchKey, searchValue, limit, offset, sortByKey, sortByValue], result => {
      if (result.length) {
        getCountModel([searchKey, searchValue, limit, offset, sortByKey, sortByValue], data => {
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)

          const { pages, currentPage } = pageInfo

          if (currentPage < pages) {
            pageInfo.nextLink = `${process.env.APP_URL}items?${pageNext}`
          }

          if (currentPage > 1) {
            pageInfo.prevLink = `${process.env.APP_URL}items?${pagePrev}`
          }

          return responseStandard(res, 200, 'List of users', { data: result, pageInfo })
        })
      } else {
        return responseStandard(res, 404, 'There is no user in list', {}, false)
      }
    })
  },
  getDetailUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
      if (result.length) {
        return responseStandard(res, 201, `Detail of id ${id}`, { data: result })
      } else {
        return responseStandard(res, 404, `User with id ${id} is not found`, {}, false)
      }
    })
  },
  updateUser: (req, res) => {
    const { id } = req.params
    const { name, email, phoneNumber, gender, dateOfBirth } = req.body
    if (name.trim() && email.trim() && phoneNumber.trim() && gender.trim() && dateOfBirth.trim()) {
      getDetailUserModel(id, result => {
        if (result.length) {
          updateUserModel([name, email, phoneNumber, gender, dateOfBirth, id], result => {
            if (result.affectedRows) {
              return responseStandard(res, 201, `User with id ${id} has been updated`)
            } else {
              return responseStandard(res, 500, 'Failed to update', {}, false)
            }
          })
        } else {
          return responseStandard(res, 404, `User with id ${id} is not found`, {}, false)
        }
      })
    } else {
      return responseStandard(res, 400, 'All fields must be filled', {}, false)
    }
  },
  updateUserPartial: (req, res) => {
    const { id } = req.params
    const data = Object.entries(req.body).map(item => {
      if (item[0] === 'phoneNumber') {
        const number = parseInt(item[1])
        return `phone_number=${number}`
      } else if (item[0] === 'dateOfBirth') {
        return `date_of_birth="${item[1]}"`
      } else {
        return `${item[0]}="${item[1]}"`
      }
    })
    if (data.length) {
      getDetailUserModel(id, result => {
        if (result.length) {
          updatePartialModel([data, id], result => {
            if (result.affectedRows) {
              return responseStandard(res, 200, `User with id ${id} has been updated`)
            } else {
              return responseStandard(res, 500, 'Failed to update', {}, false)
            }
          })
        } else {
          return responseStandard(res, 404, `User with id ${id} is not found`, {}, false)
        }
      })
    } else {
      return responseStandard(res, 400, 'At least 1 field must be filled', {}, false)
    }
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
      if (result.length) {
        deleteUserModel(id, result => {
          if (result.affectedRows) {
            return responseStandard(res, 201, 'User has been deleted')
          } else {
            return responseStandard(res, 500, 'Failed to delete user', {}, false)
          }
        })
      } else {
        return responseStandard(res, 404, `User with id ${id} is not found`, {}, false)
      }
    })
  }
}
