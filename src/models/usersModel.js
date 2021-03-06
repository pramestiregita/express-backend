const table = 'users'
const tableDetail = 'user_details'
const model = require('../helpers/model')

const column = 'users.id, users.role_id, user_details.name, users.email, users.password, user_details.phone, user_details.gender_id, gender.name AS gender, user_details.birthdate, user_details.picture AS profile_picture'
const join = 'INNER JOIN user_details ON user_details.user_id=users.id INNER JOIN gender ON gender.id=user_details.gender_id'

// const column = 'users.id, user_details.name, users.email, users.password, user_details.phone, gender.name AS gender, user_details.birthdate, user_details.picture AS profile_picture'
// const join = 'INNER JOIN user_details ON user_details.user_id=users.id INNER JOIN gender ON gender.id=user_details.gender_id'

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
  checkPhoneModel: (data = {}) => { // no duplicat email
    const query = `SELECT * FROM ${tableDetail} WHERE ?`
    const results = model(query, data)
    return results
  },
  getByCondition: (data = []) => { // no duplicat email
    const query = `SELECT * FROM ${table} WHERE ? AND ?`
    const results = model(query, data)
    return results
  },
  getUsersModel: (arr, data = []) => { // get all user (id, role, email, password)
    const user = 'users.id, roles.name AS role, users.email, users.password'
    const role = 'LEFT JOIN roles ON roles.id=users.role_id'
    const search = `WHERE users.${arr[0]} LIKE '%${arr[1]}%'`
    const query = `SELECT ${user} FROM ${table} ${role} ${search} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  detailUserModel: (data = {}) => { // get detail user (id, role, email, password, name, picture, phone, gender_id, birthdate)
    const query = `SELECT ${column} FROM ${table} ${join} WHERE users.id=?`
    console.log(query)
    const results = model(query, data)
    return results
  },
  // detailUserModel: (data = {}) => { // get detail user (id, role, email, password, name, picture, phone, gender_id, birthdate)
  //   const query = `SELECT ${column} FROM ${table} ${join} WHERE users.id=?`
  //   const results = model(query, data)
  //   return results
  // },
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
  updateUserPartialModel: (data = []) => { // update email and password
    const query = `UPDATE ${table} SET ? WHERE id=?`
    const results = model(query, data)
    return results
  },
  updateDetailPartialModel: (arr, data = {}) => { // update detail (name, picture, phone, gender_id, birthdate)
    const query = `UPDATE ${tableDetail} SET ${arr} WHERE user_id=?`
    const results = model(query, data)
    return results
  },
  deleteUserModel: (data = {}) => { // delete user by id
    const query = `DELETE FROM ${table} WHERE id=?`
    const results = model(query, data)
    return results
  }
}
