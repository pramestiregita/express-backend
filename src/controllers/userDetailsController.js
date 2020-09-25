const userDetailsModel = require('../models/userDetailsModel')
const usersModel = require('../models/usersModel')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const responseStandard = require('../helpers/response')
const joi = require('joi')

module.exports = {
  create: async (req, res) => {
    const schema = joi.object({
      user_id: joi.string().required(),
      phone: joi.string().required(),
      gender_id: joi.string().required(),
      birthdate: joi.string().required()
    })

    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const isExist = await usersModel.getByCondition({ id: results.user_id })
      if (isExist.length > 0) {
        const data = await userDetailsModel.createModel(results)
        const result = {
          id: data.insertId,
          ...results
        }
        return responseStandard(res, 'User detail created successfully', { data: result })
      } else {
        return responseStandard(res, 'User doesn\'t exist', {}, 404, false)
      }
    }
  },
  getAll: async (req, res) => {
    const { searchKey, searchValue } = searching(req.query.search)
    const { sortKey, sortBy } = sorting(req.query.sort)
    const count = await userDetailsModel.countDetails([searchKey, searchValue, sortKey, sortBy])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await userDetailsModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'Detail of all users', { data: results, pageInfo })
    } else {
      return responseStandard(res, 'There is no item in list', {}, 404, false)
    }
  },
  getDetail: async (req, res) => {
    const { id } = req.params

    const results = await userDetailsModel.detailModel(id)
    if (results.length) {
      const data = results.map(item => {
        item = {
          ...item,
          password: null
        }
        return item
      })
      return responseStandard(res, `Detail of user id ${id}`, { data: data })
    } else {
      return responseStandard(res, 'Detail user is not found! Please edit your detail first!', {}, 404, false)
    }
  }
}
