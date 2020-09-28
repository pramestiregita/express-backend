const productsModel = require('../models/productsModel')
const responseStandard = require('../helpers/response')
const { productSchema: schema, colorSchema: schemaC, colorUpdateSchema: schemaCU } = require('../helpers/validation')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const paging = require('../helpers/pagination')

module.exports = {
  create: async (req, res) => {
    const { id: idUser } = req.data
    const { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, price, conditionId, categoryId, description } = results
      let product = {
        seller_id: idUser,
        name,
        price: parseInt(price),
        condition_id: parseInt(conditionId),
        category_id: categoryId,
        description
      }
      const createProduct = await productsModel.createModel(product)
      if (createProduct.affectedRows) {
        product = {
          product_id: createProduct.insertId,
          ...product
        }
        return responseStandard(res, 'Create product successfully', { data: product })
      } else {
        return responseStandard(res, 'Failed to create product', {}, 400, false)
      }
    }
  },
  createColor: async (req, res) => {
    if (req.fileValidationError) {
      return responseStandard(res, 'Error', { error: req.fileValidationError }, 500, false)
    }
    const { value: results, error } = schemaC.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { productId, colorName, hexcode, quantity } = results
      const color = {
        product_id: productId,
        name: colorName,
        hexcode,
        quantity
      }
      const createColor = await productsModel.createColorModel(color)
      if (createColor.affectedRows) {
        const picture = req.files.map(data => {
          return data.path.replace(/\\/g, '/')
        })
        // console.log(picture)
        const pict1 = picture[0]
        const pict2 = picture[1]
        const pict3 = picture[2]
        const pict4 = picture[3]
        const id = createColor.insertId
        const createPict = await productsModel.createPictModel([id, pict1, id, pict2, id, pict3, id, pict4])
        if (createPict.affectedRows) {
          const data = {
            ...color,
            product_id: productId,
            color_id: id,
            image: {
              pict1,
              pict2,
              pict3,
              pict4
            }
          }
          return responseStandard(res, 'Product color has been created', { data: data })
        } else {
          return responseStandard(res, 'Failed to create product color', {}, 400, false)
        }
      } else {
        return responseStandard(res, 'Failed to create product color', {}, 400, false)
      }
    }
  },
  getProducts: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await productsModel.countModel([searchKey, searchValue, sortKey, sortBy])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await productsModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Products', { results, pageInfo })
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
  },
  updateProduct: async (req, res) => {
    const { id } = req.params

    let { value: results, error } = schema.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const { name, price, conditionId, categoryId, description } = results
      const isExist = await productsModel.detailModel(id)
      if (isExist.length > 0) {
        results = {
          name,
          price: parseInt(price),
          condition_id: parseInt(conditionId),
          category_id: categoryId,
          description
        }
        const updateProduct = await productsModel.updateModel([results, id])
        if (updateProduct.affectedRows) {
          responseStandard(res, 'Product\'s detail has been updated!')
        } else {
          responseStandard(res, 'Failed to update product!', {}, 304, false)
        }
      } else {
        responseStandard(res, 'Failed to update product!', {}, 304, false)
      }
    }
  },
  updateColorProduct: async (req, res) => {
    const { id } = req.params

    const { value: results, error } = schemaCU.validate(req.body)
    if (error) {
      return responseStandard(res, 'Error', { error: error.message }, 400, false)
    } else {
      const isExist = await productsModel.detailModel(id)
      if (isExist.length > 0) {
        const { colorName, hexcode, quantity } = results
        const color = {
          name: colorName,
          hexcode,
          quantity
        }
        const updateColor = await productsModel.updateColorModel([color, id])
        if (updateColor.affectedRows) {
          const picture = req.files.map(data => {
            return data.path.replace(/\\/g, '/')
          })
          // console.log(picture)
          const pict1 = picture[0]
          const pict2 = picture[1]
          const pict3 = picture[2]
          const pict4 = picture[3]
          const idColor = req.body.colorId
          const createPict = await productsModel.updatePictModel([pict1, pict2, pict3, pict4, idColor])
          if (createPict.affectedRows) {
            const data = {
              ...results,
              product_id: id,
              color_id: idColor,
              image: {
                pict1,
                pict2,
                pict3,
                pict4
              }
            }
            return responseStandard(res, 'Product color has been created', { data: data })
          } else {
            return responseStandard(res, 'Failed to create product color', {}, 400, false)
          }
        } else {
          responseStandard(res, 'Failed to update!', {}, 304, false)
        }
      } else {
        responseStandard(res, `Product with id ${id} is not found`, {}, 404, false)
      }
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params

    const isExist = await productsModel.detailModel(id)
    if (isExist.length > 0) {
      const results = await productsModel.deleteModel(id)
      if (results.affectedRows) {
        responseStandard(res, `Product with id ${id} has been deleted`)
      } else {
        responseStandard(res, `Failed to delete product with id ${id}`, {}, 500, false)
      }
    } else {
      responseStandard(res, `Product with id ${id} is not found`, {}, 404, false)
    }
  },
  getSellerProducts: async (req, res) => {
    const { id } = req.data
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    const count = await productsModel.countModel()
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await productsModel.getSellerModel([searchKey, searchValue, sortKey, sortBy], [id, limit, offset])
    if (results.length) {
      return responseStandard(res, 'List of Products', { results, pageInfo })
    } else {
      return responseStandard(res, 'There is no data in list', {}, 404, false)
    }
  },
  detailSellerProduct: async (req, res) => {
    const { id } = req.params
    const { id: sellerId } = req.data

    const results = await productsModel.detailModel([sellerId, id])
    if (results.length) {
      responseStandard(res, `Product with id ${id}`, { results })
    } else {
      responseStandard(res, `Product with id ${id} is not found`, {}, 404, false)
    }
  }
}
