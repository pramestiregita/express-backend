require('dotenv').config()
const {
  SECRETKEY_ADMIN,
  SECRETKEY_SELLER,
  SECRETKEY_CUST
} = process.env
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')

module.exports = {
  authAdmin: (req, res, next) => {
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, SECRETKEY_ADMIN)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  },
  authSeller: (req, res, next) => {
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, SECRETKEY_SELLER)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  },
  authCust: (req, res, next) => {
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7, authorization.length)
      try {
        const verify = jwt.verify(token, SECRETKEY_CUST)
        if (verify) {
          req.data = verify
          next()
        } else {
          return responseStandard(res, 'Unauthorized', {}, 401, false)
        }
      } catch (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
    } else {
      return responseStandard(res, 'Forbidden Access', {}, 403, false)
    }
  }
}
