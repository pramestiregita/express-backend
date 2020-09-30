const storesModels = require('../models/storesModels')
const usersModel = require('../models/usersModel')
const responseStandard = require('../helpers/response')
const { sellerSchema: schemaS } = require('../helpers/validation')
const bcrypt = require('bcrypt')

module.exports = {
  createStore: async (req, res) => {
    const { value: results, error } = schemaS.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 500, false)
    } else {
      const { name, email, phone, storeName, password } = results
      const isExist = await usersModel.checkEmailModel({ email })
      if (!isExist.length) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const users = {
          role_id: 2,
          email: email,
          password: hashedPassword
        }
        const createUser = await usersModel.createUserModel(users)
        if (createUser.affectedRows) {
          const detail = {
            user_id: createUser.insertId,
            name: name,
            phone: phone
          }
          const createDetail = await usersModel.createDetailModel(detail)
          if (createDetail.affectedRows) {
            const store = {
              user_id: createUser.insertId,
              name: storeName
            }
            const createStore = await storesModels.createModel(store)
            if (createStore.affectedRows) {
              const data = {
                user_id: createUser.insertId,
                email: email,
                name: name,
                phone: phone,
                store_name: storeName,
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
