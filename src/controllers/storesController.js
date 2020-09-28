const storesModels = require('../models/storesModels')
const usersModel = require('../models/usersModel')
const responseStandard = require('../helpers/response')
const { sellerSchema: schemaS } = require('../helpers/validation')
const bcrypt = require('bcrypt')

module.exports = {
  createStore: async (req, res) => {
    if (req.fileValidationError) {
      return responseStandard(res, 'Error', { error: req.fileValidationError }, 500, false)
    }
    const picture = `/uploads/${req.file.filename}`
    const { value: results, error } = schemaS.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 500, false)
    } else {
      const { roleId, name, storeName, email, password, phone, genderId, birthdate, description } = results
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
            picture: picture,
            phone: phone,
            gender_id: genderId,
            birthdate: birthdate
          }
          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const store = {
              user_id: createUser.insertId,
              name: storeName,
              description: description
            }
            const createStore = await storesModels.createModel(store)
            if (createStore.affectedRows) {
              const data = {
                ...users,
                ...detail,
                ...store,
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
          return responseStandard(res, 'Failed to create user!', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Email has already used', {}, 400, false)
      }
    }
  },
  updateStore: async (req, res) => {
    const { id: idUser } = req.data

    const update = await storesModels.updateModel([req.body, idUser])
    if (update.affectedRows) {
      return responseStandard(res, 'Store Profile has been updated')
    } else {
      return responseStandard(res, 'Failed to update store profile', {}, 400, false)
    }
  }
}
