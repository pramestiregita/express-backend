const table = 'products'
const tableColor = 'products_colors'
const tableCond = 'conditions'
const tableCat = 'categories'
const model = require('../helpers/model')

const column = `${table}.id, ${table}.seller_id, ${table}.name, ${table}.price, ${table}.description, ${tableCond}.name AS product_condition, ${tableCat}.name AS category, ${tableColor}.name AS color, ${tableColor}.quantity, ${table}.created_at, ${table}.updated_at`
const join = `LEFT JOIN ${tableCond} ON ${tableCond}.id=${table}.condition_id LEFT JOIN ${tableCat} ON ${tableCat}.id=${table}.category_id LEFT JOIN ${tableColor} ON ${tableColor}.product_id=${table}.id`

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  createColorModel: (data = {}) => {
    const query = `INSERT INTO ${tableColor} SET ?`
    const results = model(query, data)
    return results
  },
  countModel: () => {
    const query = `SELECT COUNT(*) as count FROM ${table}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.id=?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  updateColorModel: (data = []) => {
    const query = `UPDATE ${tableColor} SET ? WHERE ?`
    const results = model(query, data)
    return results
  },
  deleteModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    const results = model(query, data)
    return results
  },
  getSellerModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE products.seller_id=? AND products.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailSellerModel: (data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE seller_id=? ${table}.id=?`
    const results = model(query, data)
    return results
  }
}
