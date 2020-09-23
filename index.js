require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/category')
const usersRouter = require('./src/routes/users')
const cartRouter = require('./src/routes/cart')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
