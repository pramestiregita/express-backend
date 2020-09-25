const table = 'users'
const column = 'users.id, roles.name AS role, users.email, users.password'
const join = 'LEFT JOIN roles ON roles.id = users.role_id'
const model = require('../helpers/model')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  getByCondition: (data = {}) => {
    const query = `SELECT ${column} FROM ${table} ${join} WHERE users.?`
    const results = model(query, data)
    return results
  },
  getUsers: (email, data = []) => {
    const search = `WHERE users.email LIKE '%${email}%'`
    const query = `SELECT * FROM ${table} ${join} ${search} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  countUsers: (email) => {
    const search = `WHERE users.email LIKE '%${email}%'`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search}`
    const results = model(query)
    return results
  }
  // updateUserModel: (arr, cb) => {
  //   const name = `name = "${arr[0]}"`
  //   const email = `email = "${arr[1]}"`
  //   const phoneNumber = `phone_number = ${arr[2]}`
  //   const gender = `gender = '${arr[3]}'`
  //   const dateOfBirth = `date_of_birth = "${arr[4]}"`
  //   const update = `${name}, ${email}, ${phoneNumber}, ${gender}, ${dateOfBirth}`
  //   const query = `UPDATE ${table} SET ${update} WHERE id = ${arr[5]}`
  //   db.query(query, (_err, result, _field) => {
  //     cb(result)
  //   })
  // },
  // updatePartialModel: (arr, cb) => {
  //   const query = `UPDATE ${table} SET ${arr[0]} WHERE id=${arr[1]}`
  //   console.log(query)
  //   db.query(query, (err, result, _fields) => {
  //     console.log(result)
  //     console.log(err)
  //     cb(result)
  //   })
  // },
  // deleteUserModel: (id, cb) => {
  //   const query = `DELETE FROM ${table} WHERE id=${id}`
  //   db.query(query, (_err, result, _field) => {
  //     cb(result)
  //   })
  // }
}
