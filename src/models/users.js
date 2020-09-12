const db = require('../helpers/db')
const table = 'users'

module.exports = {
  createUserModels: (arr, cb) => {
    const column = 'name, email, phone_number, gender, date_of_birth'
    const input = `"${arr[0]}", "${arr[1]}", ${arr[2]}, '${arr[3]}', '${arr[4]}'`
    const query = `INSERT INTO ${table} (${column}) VALUES (${input})`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  getUsersModel: (arr, cb) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const page = `LIMIT ${arr[2]} OFFSET ${arr[3]}`
    const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const query = `SELECT * FROM ${table} ${search} ${sort} ${page}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  getCountModel: (arr, cb) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search} ${sort}`
    db.query(query, (_err, data, _field) => {
      cb(data)
    })
  },
  getDetailModel: (id, cb) => {
    const query = `SELECT * FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  updateUserModel: (arr, cb) => {
    const name = `name = "${arr[0]}"`
    const email = `email = "${arr[1]}"`
    const phoneNumber = `phone_number = ${arr[2]}`
    const gender = `gender = '${arr[3]}'`
    const dateOfBirth = `date_of_birth = "${arr[4]}"`
    const update = `${name}, ${email}, ${phoneNumber}, ${gender}, ${dateOfBirth}`
    const query = `UPDATE ${table} SET ${update} WHERE id = ${arr[5]}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePartialModel: (arr, cb) => {
    const query = `UPDATE ${table} SET ${arr[0]} WHERE id = ${arr[1]}`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  deleteUserModel: (id, cb) => {
    const query = `DELETE FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  }
}
