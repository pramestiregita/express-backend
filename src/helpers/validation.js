const joi = require('joi')

module.exports = {
  custSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    password: joi.string().required()
  }),
  custUpdateSchema: joi.object({
    name: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    currentPassword: joi.string().required(),
    newPassword: joi.string().required(),
    confirmPassword: joi.string().required(),
    phone: joi.number().required(),
    genderId: joi.number().required(),
    birthdate: joi.string().required()
  }),
  custUpdatePartialSchema: joi.object({
    name: joi.string().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string(),
    currentPassword: joi.string(),
    newPassword: joi.string(),
    confirmPassword: joi.string(),
    phone: joi.number(),
    genderId: joi.number(),
    birthdate: joi.string()
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
    colorName: joi.string().replace(/'/g, "\'").replace(/"/g, '\"'),
    hexcode: joi.string(),
    quantity: joi.number().required()
  }),
  colorUpdateSchema: joi.object({
    colorId: joi.number().required(),
    colorName: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    hexcode: joi.string().required(),
    quantity: joi.number().required()
  }),
  colorUpdatePartialSchema: joi.object({
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
  }),
  ratingSchema: joi.object({
    rating: joi.number().min(1).max(5).required()
  })
}
