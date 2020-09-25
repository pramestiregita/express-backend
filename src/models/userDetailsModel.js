const table = 'user_details'
const model = require('../helpers/model')
const column = 'user_details.id, user_details.user_id, user_details.name, users.email, users.password, user_details.phone, gender.name AS gender, user_details.birthdate, user_details.created_at, user_details.updated_at'
const join = 'LEFT JOIN users ON users.id=user_details.user_id LEFT JOIN gender ON gender.id=user_details.gender_id'

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  getModel: async (arr, data = {}) => {
    const search = `WHERE user_details.${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY user_details.${arr[2]} ${arr[3]}`
    const query = `SELECT ${column} FROM ${table} ${join} ${search} ${sort} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailModel: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE user_details.user_id=?`
    const results = model(query, data)
    return results
  },
  countDetails: (arr) => {
    const search = `WHERE user_details.${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY user_details.${arr[2]} ${arr[3]}`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search} ${sort}`
    const results = model(query)
    return results
  }
}
