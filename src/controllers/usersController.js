const usersModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const responseStandard = require('../helpers/response')
const { custSchema: schemaC } = require('../helpers/validation')
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    const { value: results, error } = schemaC.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { roleId, name, email, password, phone, genderId, birthdate } = results
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: roleId,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name,
            phone: phone,
            gender_id: genderId,
            birthdate: birthdate
          }
          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const data = {
              ...users,
              ...detail,
              password: null
            }
            return responseStandard(res, 'Success! User has been created!', { data: data })
          } else {
            return responseStandard(res, 'Failed to create user!', {}, 400, false)
          }
        } else {
          return responseStandard(res, 'Failed to create user!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    }
  },
  getAll: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const count = await usersModel.countUsersModel([searchKey, searchValue])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await usersModel.getUsersModel([searchKey, searchValue], [limit, offset])
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
  },
  getDetailUser: async (req, res) => {
    const { id } = req.data

    const results = await usersModel.detailUserModel(id)
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item,
          password: null
        }
        return item
      })
      responseStandard(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.data
    const { value: results, error } = schemaC.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { roleId, name, email, password, phone, genderId, birthdate } = results
      const isExist = await usersModel.checkEmailModel({ email })
      console.log(isExist)
      if (isExist[0].id === parseInt(id)) {
        if (results === isExist[0]) {
          return responseStandard(res, 'There is no change', {}, 304, false)
        } else {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)
          const users = {
            role_id: roleId,
            email: email,
            password: hashedPassword
          }
          const updateUser = await usersModel.updateUserModel([users, id])
          if (updateUser.affectedRows) {
            const detail = {
              user_id: id,
              name: name,
              phone: phone,
              gender_id: genderId,
              birthdate: birthdate
            }
            const updateDetail = await usersModel.updateDetailModel([detail, id])
            if (updateDetail.affectedRows) {
              return responseStandard(res, 'Success! User has been updated!')
            } else {
              return responseStandard(res, 'Failed to update user!', {}, 400, false)
            }
          } else {
            return responseStandard(res, 'Failed to update user!', {}, 400, false)
          }
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.data

    const isExist = await usersModel.detailUserModel(id)
    if (isExist.length > 0) {
      const results = await usersModel.deleteUserModel(id)
      if (results.affectedRows) {
        return responseStandard(res, 'User has been deleted')
      } else {
        return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'User not found', {}, 404, false)
    }
  },
  getDetailForAdmin: async (req, res) => {
    const { id } = req.params

    const results = await usersModel.detailUserModel(id)
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item,
          password: null
        }
        return item
      })
      responseStandard(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  deleteUserForAdmin: async (req, res) => {
    const { id } = req.params

    const isExist = await usersModel.detailUserModel(id)
    if (isExist.length > 0) {
      const results = await usersModel.deleteUserModel(id)
      if (results.affectedRows) {
        return responseStandard(res, 'User has been deleted')
      } else {
        return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
      }
    } else {
      return responseStandard(res, 'User not found', {}, 404, false)
    }
  },
  createAdmin: async (req, res) => {
    const { roleId, email, password } = req.body
    if (roleId && email && password) {
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: roleId,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          return responseStandard(res, 'Success! Admin User has been created!', { data: users })
        } else {
          return responseStandard(res, 'Failed to create user!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'All fields must be filled!', {}, 400, false)
    }
  }
}
