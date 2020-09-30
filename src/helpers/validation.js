const joi = require('joi')

module.exports = {
  custSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    password: joi.string().required()
  }),
  sellerSchema: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.number().required(),
    storeName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    password: joi.string().required()
  }),
  productSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    price: joi.number().required(),
    conditionId: joi.number().required(),
    categoryId: joi.number().required(),
    description: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"')
  }),
  colorSchema: joi.object({
    productId: joi.number().required(),
    colorName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    hexcode: joi.string().required(),
    quantity: joi.number().required()
  }),
  colorUpdateSchema: joi.object({
    colorId: joi.number().required(),
    colorName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    hexcode: joi.string().required(),
    quantity: joi.number().required()
  }),
  cartSchema: joi.object({
    productId: joi.number().required(),
    quantity: joi.number().required()
  }),
  addressSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    recipientName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    recipientPhone: joi.number().required(),
    address: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    postalCode: joi.number().required(),
    city: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"')
  })
}
