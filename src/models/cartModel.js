const table = 'carts'
const tableUser = 'user_details'
const tableProduct = 'products'
const tableSeller = 'stores'
const tablePict = 'products_images'
const tableColor = 'products_colors'
const model = require('../helpers/model')

const column = `${table}.id, ${tableProduct}.id AS product_id, ${tableProduct}.seller_id, ${tableSeller}.name AS store, ${table}.user_id, ${tableUser}.name AS user, ${tableProduct}.name, ${tableColor}.name AS color, ${tablePict}.image AS image, ${tableProduct}.price, ${table}.quantity, ${table}.quantity*${tableProduct}.price AS total, ${table}.created_at`
const join = `INNER JOIN ${tableUser} ON ${tableUser}.user_id=${table}.user_id INNER JOIN ${tableProduct} ON ${tableProduct}.id=${table}.product_id INNER JOIN ${tableSeller} ON ${tableSeller}.user_id=${tableProduct}.seller_id INNER JOIN ${tableColor} ON ${tableColor}.product_id=${tableProduct}.id INNER JOIN ${tablePict} ON ${tablePict}.color_id=${tableColor}.id`

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
  getModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.user_id=? ORDER BY ${arr[0]} ${arr[1]} LIMIT ? OFFSET ?`
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
