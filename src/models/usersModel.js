const table = 'users'
const model = require('../helpers/model')

module.exports = {
  createModel: (data = {}) => {
    const query = `INSERT INTO ${table} SET ?`
    const results = model(query, data)
    return results
  },
  getByCondition: (data = {}) => {
    const query = `SELECT * FROM ${table} WHERE ?`
    const results = model(query, data)
    return results
  },
  getUsers: (arr, data = []) => {
    const column = 'users.id, roles.name AS role, users.name, users.email, users.password'
    const join = 'LEFT JOIN roles ON roles.id = users.role_id'
    const search = `WHERE users.${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY users.${arr[2]} ${arr[3]}`
    const query = `SELECT ${column} FROM ${table} ${join} ${search} ${sort} LIMIT ? OFFSET ?`
    const results = model(query, data)
    return results
  },
  countUsers: () => {
    // const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    // const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const query = `SELECT COUNT(*) as count FROM ${table}`
    const results = model(query)
    return results
  }

  // getCountModel: (arr, cb) => {
  //   const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
  //   const sort = `ORDER BY ${arr[4]} ${arr[5]}`
  //   const query = `SELECT COUNT(*) as count FROM ${table} ${search} ${sort}`
  //   db.query(query, (_err, data, _field) => {
  //     cb(data)
  //   })
  // },
  // getDetailUserModel: (id, cb) => {
  //   const query = `SELECT * FROM ${table} WHERE id=${id}`
  //   db.query(query, (_err, result, _fields) => {
  //     cb(result)
  //   })
  // },
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
