// const qs = require('querystring')
const usersModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const responseStandard = require('../helpers/response')
const joi = require('joi')
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    // const picture = `/uploads/${req.file.filename}`
    const schema = joi.object({
      role_id: joi.string().required(),
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required()
    })

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { email } = results
      const isExist = await usersModel.getByCondition({ email })
      if (isExist.length > 0) {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(results.password, salt)
        results = {
          ...results,
          password: hashedPassword
        }
        const data = await usersModel.createModel(results)
        if (data.affectedRows) {
          results = {
            id: data.insertId,
            ...results,
            password: null
          }
          return responseStandard(res, 'Success! User has been created!', { data: results })
        } else {
          return responseStandard(res, 'All field must be filled', {}, 400, false)
        }
      }
    }
  },
  getAll: async (req, res) => {
    const { searchKey, searchValue } = searching(req.query.search)
    const { sortKey, sortBy } = sorting(req.query.sort)
    const count = await usersModel.countUsers()
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await usersModel.getUsers([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    console.log(results)
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item,
          password: null
        }
        return item
      })
      return responseStandard(res, 'List of Users', { data, pageInfo })
    } else {
      return responseStandard(res, 'There is no user in list', {}, 404, false)
    }
  }
  //
  // getDetailUser: (req, res) => {
  //   const { id } = req.params
  //   getDetailUserModel(id, result => {
  //     if (result.length) {
  //       return responseStandard(res, `Detail of id ${id}`, { data: result })
  //     } else {
  //       return responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
  //     }
  //   })
  // },
  // updateUser: (req, res) => {
  //   const { id } = req.params
  //   const { name, email, phoneNumber, gender, dateOfBirth } = req.body
  //   if (name.trim() && email.trim() && phoneNumber.trim() && gender.trim() && dateOfBirth.trim()) {
  //     getDetailUserModel(id, result => {
  //       if (result.length) {
  //         updateUserModel([name, email, phoneNumber, gender, dateOfBirth, id], result => {
  //           if (result.affectedRows) {
  //             return responseStandard(res, `User with id ${id} has been updated`)
  //           } else {
  //             return responseStandard(res, 'Failed to update', {}, 500, false)
  //           }
  //         })
  //       } else {
  //         return responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
  //       }
  //     })
  //   } else {
  //     return responseStandard(res, 'All fields must be filled', {}, 400, false)
  //   }
  // },
  // updateUserPartial: (req, res) => {
  //   const { id } = req.params
  //   const data = Object.entries(req.body).map(item => {
  //     if (item[0] === 'phoneNumber') {
  //       const number = parseInt(item[1])
  //       return `phone_number=${number}`
  //     } else if (item[0] === 'dateOfBirth') {
  //       return `date_of_birth="${item[1]}"`
  //     } else {
  //       return `${item[0]}="${item[1]}"`
  //     }
  //   })
  //   if (data.length) {
  //     getDetailUserModel(id, result => {
  //       if (result.length) {
  //         updatePartialModel([data, id], result => {
  //           if (result.affectedRows) {
  //             return responseStandard(res, `User with id ${id} has been updated`)
  //           } else {
  //             return responseStandard(res, 'Failed to update', {}, 500, false)
  //           }
  //         })
  //       } else {
  //         return responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
  //       }
  //     })
  //   } else {
  //     return responseStandard(res, 'At least 1 field must be filled', {}, 400, false)
  //   }
  // },
  // deleteUser: (req, res) => {
  //   const { id } = req.params
  //   getDetailUserModel(id, result => {
  //     if (result.length) {
  //       deleteUserModel(id, result => {
  //         if (result.affectedRows) {
  //           return responseStandard(res, 'User has been deleted')
  //         } else {
  //           return responseStandard(res, 'Failed to delete user', {}, 500, false)
  //         }
  //       })
  //     } else {
  //       return responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
  //     }
  //   })
  // }
}
