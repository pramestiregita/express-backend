const db = require('../helpers/db')
const table = 'cart'

module.exports = {
  createCartModel: (arr, cb) => {
    const query = `INSERT INTO ${table} (user_id, item_id, quantity) VALUES (${arr[0]},${arr[1]},${arr[2]})`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  getCartModel: (arr, cb) => {
    const column = 'cart.id, cart.user_id, users.name AS user_name, items.name AS item_name, cart.quantity, items.price, cart.quantity*items.price AS total'
    const user = 'cart.user_id=users.id'
    const item = 'cart.item_id=items.id'
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY ${arr[4]} ${arr[5]}`
    const page = `LIMIT ${arr[2]} OFFSET ${arr[3]}`
    const query = `SELECT ${column} FROM ${table} LEFT JOIN users ON ${user} LEFT JOIN items ON ${item} ${search} ${sort} ${page}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  getCartCountModel: (arr, cb) => {
    const search = `WHERE ${arr[0]} LIKE '%${arr[1]}%'`
    const sort = `ORDER BY ${arr[2]} ${arr[3]}`
    const query = `SELECT COUNT(*) AS count FROM ${table} ${search} ${sort}`
    db.query(query, (_err, data, _field) => {
      cb(data)
    })
  },
  getDetailUserCartModel: (id, cb) => {
    const column = 'cart.id, cart.user_id, users.name AS user_name, items.name AS item_name, cart.quantity, items.price, cart.quantity*items.price AS total'
    const user = 'cart.user_id=users.id'
    const item = 'cart.item_id=items.id'
    const query = `SELECT ${column} FROM ${table} LEFT JOIN users ON ${user} LEFT JOIN items ON ${item} WHERE user_id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  getDetailCartModel: (id, cb) => {
    const column = 'cart.id, cart.user_id, users.name AS user_name, items.name AS item_name, cart.quantity, items.price, cart.quantity*items.price AS total'
    const user = 'cart.user_id=users.id'
    const item = 'cart.item_id=items.id'
    const query = `SELECT ${column} FROM ${table} LEFT JOIN users ON ${user} LEFT JOIN items ON ${item} WHERE cart.id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  },
  updateQuantityModel: (arr, cb) => {
    const query = `UPDATE ${table} SET quantity=${arr[0]} WHERE id = ${arr[1]}`
    db.query(query, (_err, result, _fields) => {
      cb(result)
    })
  },
  deleteCartModel: (id, cb) => {
    const query = `DELETE FROM ${table} WHERE id=${id}`
    db.query(query, (_err, result, _field) => {
      cb(result)
    })
  }
}
