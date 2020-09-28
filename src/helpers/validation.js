const joi = require('joi')

module.exports = {
  custSchema: joi.object({
    roleId: joi.string().required(),
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    genderId: joi.string().required(),
    birthdate: joi.string().required()
  }),
  sellerSchema: joi.object({
    roleId: joi.string().required(),
    name: joi.string().required(),
    storeName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    genderId: joi.string().required(),
    birthdate: joi.string().required(),
    description: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"')
  }),
  productSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    price: joi.string().required(),
    conditionId: joi.string().required(),
    categoryId: joi.string().required(),
    description: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"')
  }),
  colorSchema: joi.object({
    productId: joi.string().required(),
    colorName: joi.string().required(),
    hexcode: joi.string().required(),
    quantity: joi.string().required()
  }),
  colorUpdateSchema: joi.object({
    colorId: joi.string().required(),
    colorName: joi.string().required(),
    hexcode: joi.string().required(),
    quantity: joi.string().required()
  }),
  cartSchema: joi.object({
    productId: joi.string().required(),
    quantity: joi.string().required()
  })
}
