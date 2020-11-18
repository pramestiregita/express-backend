const productsModel = require('../models/productsModel')
const responseStandard = require('../helpers/response')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const paging = require('../helpers/pagination')

module.exports = {
  getProducts: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await productsModel.countModel([searchKey, searchValue, sortKey, sortBy])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await productsModel.getModel([searchKey, searchValue, 'created_at', 'DESC'], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Products', { data: results, pageInfo })
    } else {
      return responseStandard(res, 'There is no data in list', {}, 404, false)
    }
  },
  detailProduct: async (req, res) => {
    const { id } = req.params

    const results = await productsModel.detailModel(id)
    if (results.length) {
      responseStandard(res, `Product with id ${id}`, { results })
    } else {
      responseStandard(res, `Product with id ${id} is not found`, {}, 404, false)
    }
  }
}
