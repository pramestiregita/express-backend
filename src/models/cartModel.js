const table = 'carts'
const tableUser = 'user_details'
const tableProduct = 'products'
const tableSeller = 'stores'
const model = require('../helpers/model')

const column = `${table}.id, ${tableProduct}.seller_id, ${tableSeller}.name AS store, ${table}.user_id, ${tableUser}.name AS user, ${tableProduct}.name, ${tableProduct}.price, ${table}.quantity, ${table}.quantity*${tableProduct}.price AS total`
const join = `LEFT JOIN ${tableUser} ON ${tableUser}.user_id=${table}.user_id LEFT JOIN ${tableProduct} ON ${tableProduct}.id=${table}.product_id LEFT JOIN ${tableSeller} ON ${tableSeller}.user_id=${tableProduct}.seller_id`

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  countModel: (data = {}) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE user_id=?`
    const results = model(query, data)
    return results
  },
  getModel: (data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.user_id=? LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  getAllModel: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.user_id=?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = []) => {
    const query = `SELECT * FROM ${table} WHERE user_id=? AND id=?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE id = ?`
    const results = model(query, data)
    return results
  },
  deleteModel: (data = []) => {
    const query = `DELETE FROM ${table} WHERE user_id=? AND id = ?`
    const results = model(query, data)
    return results
  },
  deleteAllModel: (data = []) => {
    const query = `DELETE FROM ${table} WHERE user_id=?`
    const results = model(query, data)
    return results
  }
}
