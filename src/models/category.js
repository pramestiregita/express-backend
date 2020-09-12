const db = require('../helpers/db')
const table = 'category'

module.exports = {
  createCategoryModel: (category, cb) => {
    const query = `INSERT INTO ${table} (category_name) VALUES ('${category}')`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  getCategoryModel: (arr, cb) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const page = `LIMIT ${arr[2]} OFFSET ${arr[3]}`
    const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const query = `SELECT * FROM ${table} ${search} ${sort} ${page}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  countCategoryModel: (arr, cb) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const page = `LIMIT ${arr[2]} OFFSET ${arr[3]}`
    const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const query = `SELECT COUNT(*) as count FROM ${table} ${search} ${sort} ${page}`
    db.query(query, (_err, data, _field) => {
      cb(data)
    })
  },
  getDetailModel: (id, cb) => {
    const query = `SELECT * FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  updateCategoryModel: (arr, cb) => {
    const query = `UPDATE ${table} SET category_name = '${arr[0]}' WHERE id=${arr[1]}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    const query = `DELETE FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  }
}
