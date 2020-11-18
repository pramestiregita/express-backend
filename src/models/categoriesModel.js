const table = 'categories'
const tableProduct = 'products'
const tableColor = 'products_colors'
const tablePict = 'products_images'
const tableCond = 'conditions'
const tableRating = 'products_ratings'
const tableStore = 'stores'
const model = require('../helpers/model')

const column = `${table}.id AS category, ${table}.name AS category_name, ${tableProduct}.id, ${tableProduct}.seller_id, ${tableProduct}.name, ${tableProduct}.price, ${tableProduct}.description, ${tableCond}.name AS product_condition, ${tableStore}.name AS store, ${tableColor}.name AS color, ${tableColor}.hexcode AS hex, ${tablePict}.image, ${tableColor}.quantity, ${tableProduct}.created_at, ${tableProduct}.updated_at`
const join = 'INNER JOIN products ON products.category_id=categories.id INNER JOIN conditions ON conditions.id=products.condition_id INNER JOIN products_colors ON products_colors.product_id=products.id INNER JOIN products_images ON products_images.color_id=products_colors.id INNER JOIN stores ON stores.user_id=products.seller_id'

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
    const query = `SELECT ${column}, (SELECT AVG(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS rating, (SELECT COUNT(rating) FROM ${tableRating} WHERE ${tableRating}.product_id=products.id) AS ratingCount FROM ${table} ${join} WHERE ${table}.id=? AND ${table}.${arr[0]} LIKE '%${arr[1]}%' ORDER BY ${table}.${arr[2]} ${arr[3]} LIMIT ? OFFSET ?`
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
