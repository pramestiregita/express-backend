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
  })
}
