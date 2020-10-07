const table = 'categories'
const model = require('../helpers/model')

const column = `${table}.id AS category, ${table}.name AS category_name, products.*`
const join = 'LEFT JOIN products ON products.category_id=categories.id LEFT JOIN conditions ON conditions.id=products.condition_id'

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} (name) VALUES (?)`
    const results = model(query, data)
    return results
  },
  countModel: (arr) => {
    const query = `SELECT COUNT(*) as count FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query)
    return results
  },
  getModel: (arr, data = []) => {
    const query = `SELECT * FROM ${table} WHERE ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  countDetailModel: (arr, data = {}) => {
    const query = `SELECT COUNT(*) as count FROM products WHERE category_id=? AND ${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${arr[2]} ${arr[3]}`
    const results = model(query, data)
    return results
  },
  detailModel: (arr, data = []) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE ${table}.id=? AND ${table}.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${table}.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  updateModel: (data = []) => {
    const query = `UPDATE ${table} SET name = ? WHERE id = ?`
    const results = model(query, data)
    return results
  },
  deleteModel: (data = {}) => {
    const query = `DELETE FROM ${table} WHERE id = ?`
    const results = model(query, data)
    return results
  }
}
