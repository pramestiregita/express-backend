const qs = require('querystring')

const { createUserModels, getUsersModel, getCountModel, getDetailUserModel, updateUserModel, updatePartialModel, deleteUserModel } = require('../models/users')

module.exports = {
  createUser: (req, res) => {
    const { name, email, phoneNumber, gender, dateOfBirth } = req.body

    if (name && email && phoneNumber && gender && dateOfBirth) {
      createUserModels([name, email, phoneNumber, gender, dateOfBirth], result => {
        res.send({
          success: true,
          message: 'User has been created',
          data: {
            id: result.insertId,
            ...req.body
          }
        })
      })
    } else {
      res.send({
        success: false,
        message: 'All item must be filled'
      })
    }
  },
  getUsers: (req, res) => {
    const { page = 1, limit = 10, search, sortBy } = req.query
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
            pageInfo.nextLink = `http://localhost:8080/items?${pageNext}`
          }

          if (currentPage > 1) {
            pageInfo.prevLink = `http://localhost:8080/items?${pagePrev}`
          }

          res.send({
            success: true,
            message: 'List of users',
            data: result,
            pageInfo
          })
        })
      } else {
        res.send({
          success: false,
          message: 'There is no users in list',
          pageInfo
        })
      }
    })
  },
  getDetailUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
      if (result.length) {
        res.status(201).send({
          success: true,
          message: `Detail of id ${id}`,
          data: result
        })
      } else {
        res.status(201).send({
          success: false,
          message: `User with id ${id} is not found`
        })
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
              res.status(201).send({
                success: true,
                message: `User with id ${id} has been updated`
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
            message: `User with id ${id} is not found`
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
              res.send({
                success: true,
                message: `User with id ${id} has been updated`
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
            message: `User with id ${id} is not found`
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
  deleteUser: (req, res) => {
    const { id } = req.params
    getDetailUserModel(id, result => {
      if (result.length) {
        deleteUserModel(id, result => {
          if (result.affectedRows) {
            res.status(201).send({
              success: true,
              message: 'User has been deleted'
            })
          } else {
            res.status(500).send({
              success: false,
              message: 'Failed to delete user'
            })
          }
        })
      } else {
        res.send({
          success: false,
          message: `User with id ${id} is not found`
        })
      }
    })
  }
}
