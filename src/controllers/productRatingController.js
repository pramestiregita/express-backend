const prodRatingModel = require('../models/productRatingModel')
const responseStandard = require('../helpers/response')
const { ratingSchema: schema } = require('../helpers/validation')

module.exports = {
  create: async (req, res) => {
    const { id: userId } = req.data
    const { id } = req.params
    let { value: results, error } = schema.validate(req.body)

    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      results = {
        ...results,
        product_id: id,
        user_id: userId
      }
      const rating = await prodRatingModel.createModel(results)
      if (rating.affectedRows) {
        results = {
          id: rating.insertId,
          ...results
        }
        return responseStandard(res, 'Thank you for give a rating!', { results })
      } else {
        return responseStandard(res, 'Failed to give rating', {}, 500, false)
      }
    }
  }
}
