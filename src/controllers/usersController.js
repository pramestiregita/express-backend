const usersModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const responseStandard = require('../helpers/response')
const { userSchema: schema } = require('../helpers/validation')
const bcrypt = require('bcrypt')

module.exports = {
  create: async (req, res) => {
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { roleId, name, email, password, phone, genderId, birthdate } = results
      const isExist = await usersModel.checkEmailModel({ email })
      console.log(isExist)
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: roleId,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        console.log(createUser)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name,
            phone: phone,
            gender_id: genderId,
            birthdate: birthdate
          }
          console.log(detail)
          const createDetail = await usersModel.createDetailModel(detail)
          console.log(createDetail)
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
  }
  // getAll: async (req, res) => {
  //   console.log(req.params.search)
  //   const { searchValue } = searching(req.query.search)
  //   const count = await usersModel.countUsers(searchValue)
  //   const page = paging(req, count[0].count)
  //   const { offset, pageInfo } = page
  //   const { limitData: limit } = pageInfo

  //   const results = await usersModel.getUsers(searchValue, [limit, offset])
  //   console.log(results)
  //   if (results.length) {
  //     const data = results.map(item => {
  //       item = {
  //         ...item,
  //         password: null
  //       }
  //       return item
  //     })
  //     return responseStandard(res, 'List of Users', { data, pageInfo })
  //   } else {
  //     return responseStandard(res, 'There is no user in list', {}, 404, false)
  //   }
  // },
  // getDetailUser: async (req, res) => {
  //   const { id } = req.params

  //   const results = await usersModel.getByCondition({ id: id })
  //   if (results.length) {
  //     const data = results.map(item => {
  //       item = {
  //         ...item,
  //         password: null
  //       }
  //       return item
  //     })
  //     responseStandard(res, `Detail of user id ${id}`, { data })
  //   } else {
  //     responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
  //   }
  // },
  // deleteUser: async (req, res) => {
  //   const { id } = req.params

  //   const isExist = await usersModel.getByCondition({ id: id })
  //   try {
  //     console.log(isExist)
  //     if (isExist.length > 0) {
  //       const results = await usersModel.deleteModel(id)
  //       try {
  //         if (results.affectedRows) {
  //           return responseStandard(res, 'User has been deleted')
  //         } else {
  //           return responseStandard(res, 'Failed to delete! Try again later!', {}, 500, false)
  //         }
  //       } catch (err) {
  //         return responseStandard(res, 'Error', { error: err.message }, 500, false)
  //       }
  //     } else {
  //       return responseStandard(res, 'User not found', {}, 404, false)
  //     }
  //   } catch (err) {
  //     return responseStandard(req, 'Error', { error: err.message }, 500, false)
  //   }
  // }
}
