const table = 'users'
const tableDetail = 'user_details'
const model = require('../helpers/model')

const column = 'users.id, roles.name AS role, user_details.name, users.email, users.password, user_details.phone, gender.name AS gender, user_details.birthdate, user_details.created_at, user_details.updated_at'
const join = 'LEFT JOIN user_details ON user_details.id=users.id LEFT JOIN roles ON roles.id=users.role_id LEFT JOIN gender ON gender.id=users.gender_id'

module.exports = {
  createUserModel: (data = {}) => { // role_id, email, password
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  createDetailModel: (data = {}) => { // user_id, name, picture, phone, gender_id, birthdate
    const query = `INSERT INTO ${tableDetail} SET ?`
    const results = model(query, data)
    return results
  },
  checkEmailModel: (data = {}) => { // no duplicat email
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  getUsersModel: (arr, data = []) => { // get all user (id, role, email, password)
    const user = 'users.id, roles.name AS role, users.email, users.password'
    const role = 'LEFT JOIN roles ON roles.id=users.role_id'
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT ${user} FROM ${table} ${role} ${search} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailUserModel: (data = {}) => { // get detail user (name, picture, phone, gender_id, birthdate)
    const query = `SELECT ${column} FROM ${table} ${join} WHERE users.id=?`
    const results = model(query, data)
    return results
  },
  countUsersModel: (arr) => { // count for paging
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  },
  updateUserModel: (data = []) => { // update email and password
    const query = `UPDATE ${table} SET ? WHERE id=?`
    const results = model(query, data)
    return results
  },
  updateDetailModel: (data = []) => { // update detail (name, picture, phone, gender_id, birthdate)
    const query = `UPDATE ${tableDetail} SET ? WHERE user_id=?`
    const results = model(query, data)
    return results
  },
  deleteUserModel: (data = {}) => { // delete user by id
    const query = `DELETE FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  }
}
