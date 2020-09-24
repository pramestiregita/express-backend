const rolesModel = require('../models/rolesModel')
const responseStandard = require('../helpers/response')
const paging = require('../helpers/pagination')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')

module.exports = {
  create: async (req, res) => {
    const { name } = req.body
    if (name) {
      const results = await rolesModel.createModel(name)
      const data = {
        id: results.insertId,
        ...req.body
      }
      responseStandard(res, 'Item has been created', { data }, 201)
    } else {
      responseStandard(res, 'Failed to create item', {}, 400, false)
    }
  },
  getRoles: async (req, res) => {
    const { searchKey, searchValue } = searching(req.query.search)
    const { sortKey, sortBy } = sorting(req.query.sort)
    const count = await rolesModel.countModel()
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await rolesModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    responseStandard(res, 'List of Roles', { results, pageInfo })
  }
}
