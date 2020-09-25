require('dotenv').config()
const { APP_PORT } = process.env
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// import route
// const itemsRouter = require('./src/routes/items')
// const categoryRouter = require('./src/routes/category')
// const cartRouter = require('./src/routes/cart')
const rolesRouter = require('./src/routes/manageRoles')
const usersRouter = require('./src/routes/manageUsers')

// import middleware
// const authMiddleware = require('./src/middlewares/auth')

// provide static files
// app.use('/uploads', express.static('assets/uploads/'))

// app.use('/items', itemsRouter)
// app.use('/category', categoryRouter)
// app.use('/users', authMiddleware, usersRouter)
// app.use('/manage/users', usersRouter)
// app.use('/cart', cartRouter)
app.use('/manage/roles', rolesRouter)
app.use('/manage/users', usersRouter)

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
