const table = 'carts'
const model = require('../helpers/model')

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
    const query = `SELECT * FROM ${table} WHERE user_id=? LIMIT ? OFFSET ?`
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
  }
}
