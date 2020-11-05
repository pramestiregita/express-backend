const usersModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const responseStandard = require('../helpers/response')
const { custSchema: schemaC, custUpdateSchema: schemaU, custUpdatePartialSchema: schemaP } = require('../helpers/validation')
const bcrypt = require('bcrypt')
const upload = require('../helpers/upload').single('picture')
const multer = require('multer')

module.exports = {
  create: async (req, res) => {
    const { value: results, error } = schemaC.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, email, password } = results
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: 3,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name
          }
          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const data = {
              user_id: createUser.insertId,
              name,
              email,
              password: undefined
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
          password: undefined
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
          password: undefined
        }
        return item
      })
      responseStandard(res, `Detail of user id ${id}`, { data })
    } else {
      responseStandard(res, `User with id ${id} is not found`, {}, 404, false)
    }
  },
  updateUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }

      const { id } = req.data
      const isExist = await usersModel.detailUserModel(id)
      if (isExist.length) {
        const oldPassword = isExist[0].password
        const roleId = isExist[0].role_id
        const { value: results, error } = schemaU.validate(req.body)
        if (error) {
          return responseStandard(res, 'Error', { error: error.message }, 400, false)
        } else {
          const { name, email, currentPassword, newPassword, confirmPassword, phone, genderId, birthdate } = results
          const isExist = await usersModel.checkEmailModel({ email })
          let existEmail = 0
          if (isExist.length) {
            existEmail = isExist[0].id
          }
          if (existEmail === parseInt(id) || !isExist.length) {
            if (results === isExist[0]) {
              return responseStandard(res, 'There is no change', {}, 304, false)
            } else {
              const isExist = await usersModel.checkPhoneModel({ phone })
              let existPhone = 0
              if (isExist.length) {
                existPhone = isExist[0].user_id
              }
              if (existPhone === parseInt(id) || !isExist.length) {
                const oldPass = await bcrypt.compare(currentPassword, oldPassword)
                if (oldPass === false) {
                  return responseStandard(res, 'Wrong password', {}, 400, false)
                } else {
                  const newPass = newPassword === confirmPassword
                  if (newPass === false) {
                    return responseStandard(res, 'New password doesn\'t match', {}, 400, false)
                  } else {
                    const salt = await bcrypt.genSalt(10)
                    const hashedPassword = await bcrypt.hash(newPassword, salt)
                    const users = {
                      role_id: roleId,
                      email: email,
                      password: hashedPassword
                    }
                    const updateUser = await usersModel.updateUserModel([users, id])
                    if (updateUser.affectedRows) {
                      const picture = `uploads/${req.file.filename}`
                      const detail = {
                        user_id: id,
                        name: name,
                        picture: picture,
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
                }
              } else {
                return responseStandard(res, 'Phone number has already used', {}, 400, false)
              }
            }
          } else {
            return responseStandard(res, 'Email has already used', {}, 400, false)
          }
        }
      } else {
        return responseStandard(res, 'There is no user', {}, 404, false)
      }
    })
  },
  updatePartial: async (req, res) => {
    upload(req, res, async (err) => {
      const { id } = req.data
      console.log(id)
      const isExist = await usersModel.detailUserModel(id)
      console.log(isExist)
      if (isExist.length) {
        if (err instanceof multer.MulterError) {
          return responseStandard(res, err.message, {}, 500, false)
        } else if (err) {
          return responseStandard(res, err.message, {}, 500, false)
        }
        let picture = {}
        if (req.file) {
          // picture = `uploads/${req.file.filename}`
          picture = {
            picture: `uploads/${req.file.filename}`
          }
        }
        const { value: results } = schemaP.validate(req.body)
        const updated = Object.keys(results).map(async item => {
          if (item === 'email' || item === 'currentPassword' || item === 'newPassword' || item === 'confirmPassword') {
            const { email, currentPassword, newPassword, confirmPassword } = results
            if (email) {
              const emailExist = await usersModel.checkEmailModel({ email })
              if (emailExist.length) {
                const userId = emailExist[0].id
                if (userId !== id) {
                  return responseStandard(res, 'Email has already used', {}, 400, false)
                }
              } else {
                const data = {
                  email
                }
                const update = await usersModel.updateUserPartialModel([data, id])
                return update
              }
            }
            if (newPassword) {
              const oldPassword = isExist[0].password
              const oldPass = await bcrypt.compare(currentPassword, oldPassword)
              if (oldPass === false) {
                return responseStandard(res, 'Wrong password', {}, 400, false)
              } else if (currentPassword === newPassword) {
                return responseStandard(res, 'Password doesn\'t change', {}, 400, false)
              } else {
                const newPass = newPassword === confirmPassword
                if (newPass === false) {
                  return responseStandard(res, 'New password doesn\'t match', {}, 400, false)
                } else {
                  const salt = await bcrypt.genSalt(10)
                  const hashedPassword = await bcrypt.hash(newPassword, salt)
                  const data = {
                    password: hashedPassword
                  }
                  const update = await usersModel.updateUserPartialModel([data, id])
                  return update
                }
              }
            }
          } else {
            const { name, phone, genderId, birthdate } = results
            let data = {
              name,
              phone,
              gender_id: genderId,
              birthdate
            }
            if (picture) {
              data = {
                ...data,
                picture
              }
            }
            console.log(data)
            const update = await usersModel.updateDetailPartialModel([data, id])
            console.log(update)
            return update
          }
        })
        const updateResults = await Promise.all(updated)
        console.log(updateResults)
        if (updateResults[0].affectedRows) {
          return responseStandard(res, 'Update succesfully')
        } else {
          return responseStandard(res, 'Failed to update', {}, 500, false)
        }
      } else {
        return responseStandard(res, 'There is no user', {}, 404, false)
      }
    })
  },
  updateDetail: async (req, res) => {
    const { id } = req.data
    const isExist = await usersModel.detailUserModel(id)
    console.log(isExist)
    if (isExist.length) {
      const { value: results } = schemaP.validate(req.body)
      console.log(results)
      const updated = Object.keys(results).map(async item => {
        if (item === 'email' || item === 'currentPassword' || item === 'newPassword' || item === 'confirmPassword') {
          const { email, currentPassword, newPassword, confirmPassword } = results
          if (email) {
            const emailExist = await usersModel.checkEmailModel({ email })
            if (emailExist.length) {
              const userId = emailExist[0].id
              if (userId !== id) {
                return responseStandard(res, 'Email has already used', {}, 400, false)
              }
            } else {
              const data = {
                email
              }
              const update = await usersModel.updateUserPartialModel([data, id])
              return update
            }
          }
          if (newPassword) {
            const oldPassword = isExist[0].password
            const oldPass = await bcrypt.compare(currentPassword, oldPassword)
            if (oldPass === false) {
              return responseStandard(res, 'Wrong password', {}, 400, false)
            } else if (currentPassword === newPassword) {
              return responseStandard(res, 'Password doesn\'t change', {}, 400, false)
            } else {
              const newPass = newPassword === confirmPassword
              if (newPass === false) {
                return responseStandard(res, 'New password doesn\'t match', {}, 400, false)
              } else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt)
                const data = {
                  password: hashedPassword
                }
                const update = await usersModel.updateUserPartialModel([data, id])
                return update
              }
            }
          }
        } else {
          const { name, phone, genderId, birthdate } = results
          const detail = {
            name, phone, genderId, birthdate
          }
          const data = Object.entries(detail).map(item => {
            if (item[0] === 'genderId') {
              return `gender_id = ${item[1]}`
            } else {
              return `${item[0]} = '${item[1]}'`
            }
          })
          console.log(data)
          const update = await usersModel.updateDetailPartialModel(data, id)
          return update
        }
      })
      const updateResults = await Promise.all(updated)
      console.log(updateResults)
      if (updateResults[0].affectedRows) {
        return responseStandard(res, 'Update succesfully')
      } else {
        return responseStandard(res, 'Failed to update', {}, 500, false)
      }
    } else {
    }
  },
  updatePict: async (req, res) => {
    upload(req, res, async (err) => {
      const { id } = req.data
      console.log(id)
      const isExist = await usersModel.detailUserModel(id)
      console.log(isExist)
      if (isExist.length) {
        if (err instanceof multer.MulterError) {
          return responseStandard(res, err.message, {}, 500, false)
        } else if (err) {
          return responseStandard(res, err.message, {}, 500, false)
        }
        let picture = ''
        if (req.file) {
          // picture = `uploads/${req.file.filename}`
          picture = `picture = 'uploads/${req.file.filename}'`
        }
        console.log(picture)
        const update = await usersModel.updateDetailPartialModel(picture, id)

        if (update.affectedRows) {
          return responseStandard(res, 'Update succesfully')
        } else {
          return responseStandard(res, 'Failed to update', {}, 500, false)
        }
      } else {
        return responseStandard(res, 'There is no user', {}, 404, false)
      }
    })
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
    const { email, password } = req.body
    if (email && password) {
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        let users = {
          role_id: 1,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          users = {
            ...users,
            password: null
          }
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
  },
  updatePassword: async (req, res) => {
    const { id } = req.data
    const isExist = await usersModel.detailUserModel(id)
    const { oldPassword, newPassword, confrimPassword } = req.body
    // console.log(isExist)
    if (isExist.length) {
      const currentPassword = isExist[0].password
      const oldPass = await bcrypt.compare(oldPassword, currentPassword)
      console.log(oldPass)
      if (oldPass === false) {
        return responseStandard(res, 'Old password is wrong', {}, 400, false)
      } else if (currentPassword === newPassword) {
        return responseStandard(res, 'Password doesn\'t change', {}, 400, false)
      } else {
        const newPass = newPassword === confrimPassword
        // console.log(newPassword, confrimPassword)
        if (newPass === false) {
          return responseStandard(res, 'New password doesn\'t match', {}, 400, false)
        } else {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(newPassword, salt)
          const data = {
            password: hashedPassword
          }
          const update = await usersModel.updateUserPartialModel([data, id])
          if (update.affectedRows) {
            return responseStandard(res, 'Update succesfully')
          } else {
            return responseStandard(res, 'Failed to update', {}, 500, false)
          }
        }
      }
    } else {
      return responseStandard(res, 'User not found', {}, 404, false)
    }
  }
}
