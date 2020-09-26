require('dotenv').config()
const {
  SECRETKEY_ADMIN,
  SECRETKEY_SELLER,
  SECRETKEY_CUST
} = process.env
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { checkEmailModel } = require('../models/usersModel')
const responseStandard = require('../helpers/response')

module.exports = {
  authAdminController: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 1) {
        if (compared === true) {
          jwt.sign({ id: id }, SECRETKEY_ADMIN, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as admin successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  },
  authSellerController: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 2) {
        if (compared === true) {
          jwt.sign({ id: id }, SECRETKEY_SELLER, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as seller successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  },
  authCustController: async (req, res) => {
    const { email, password } = req.body
    const data = await checkEmailModel([{ email }])
    if (data.length) {
      const hashed = data[0].password
      const roleId = data[0].role_id
      const id = data[0].id
      const compared = await bcrypt.compare(password, hashed)
      if (roleId === 3) {
        if (compared === true) {
          jwt.sign({ id: id }, SECRETKEY_CUST, (err, token) => {
            if (err) {
              return responseStandard(res, 'Error', { error: err.message }, 500, false)
            } else {
              return responseStandard(res, 'Login as customer successfuly', { token })
            }
          })
        } else {
          return responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Wrong email or password', {}, 400, false)
      }
    } else {
      return responseStandard(res, 'Wrong email or password', {}, 400, false)
    }
  }
}
