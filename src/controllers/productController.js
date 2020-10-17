const productsModel = require('../models/productsModel')
const responseStandard = require('../helpers/response')
const { productSchema: schema, colorSchema: schemaC, colorUpdateSchema: schemaCU } = require('../helpers/validation')
const searching = require('../helpers/search')
const sorting = require('../helpers/sort')
const paging = require('../helpers/pagination')
const upload = require('../helpers/upload').array('picture')
const multer = require('multer')

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
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        return responseStandard(res, err.message, {}, 500, false)
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
          const id = createColor.insertId
          const picture = req.files.map(data => {
            const pict = {
              color_id: id,
              image: `uploads/${data.filename}`
            }
            return pict
          })
          const createPict = picture.map(async item => {
            const create = await productsModel.createPictModel(item)
            return create
          })
          const createdPict = await Promise.all(createPict)
          if (createdPict[0].affectedRows) {
            const data = {
              ...color,
              product_id: productId,
              color_id: id,
              image: picture
            }
            return responseStandard(res, 'Product color has been created', { data: data })
          } else {
            return responseStandard(res, 'Failed to create product color', {}, 400, false)
          }
        } else {
          return responseStandard(res, 'Failed to create product color', {}, 400, false)
        }
      }
    })
  },
  getProducts: async (req, res) => {
    const { searchKey, searchValue } = searching.name(req.query.search)
    const { sortKey, sortBy } = sorting.name(req.query.sort)
    console.log(sortKey)
    const count = await productsModel.countModel([searchKey, searchValue, sortKey, sortBy])
    const page = paging(req, count[0].count)
    const { offset, pageInfo } = page
    const { limitData: limit } = pageInfo

    const results = await productsModel.getModel([searchKey, searchValue, sortKey, sortBy], [limit, offset])
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
      responseStandard(res, `Product with id ${id}`, { data: results })
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
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandard(res, err.message, {}, 500, false)
      } else if (err) {
        return responseStandard(res, err.message, {}, 500, false)
      }
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
            let path = []
            const picture = req.files.map(data => {
              const pict = {
                color_id: req.body.colorId,
                image: `uploads/${data.filename}`
              }
              path = `uploads/${data.filename}`
              return pict
            })
            console.log(picture)
            const updatePict = picture.map(async item => {
              const update = await productsModel.updatePictModel([item, req.body.colorId])
              return update
            })
            const updatedPict = await Promise.all(updatePict)
            console.log(updatedPict)
            if (updatedPict[0].affectedRows) {
              const data = {
                ...results,
                product_id: id,
                color_id: req.body.colorId,
                image: picture
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
    })
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
    const count = await productsModel.countModel([searchKey, searchValue, sortKey, sortBy], id)
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
