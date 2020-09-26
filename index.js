require('dotenv').config()
const { APP_PORT } = process.env
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// import middleware
const {
  authAdmin, authSeller, authCust
} = require('./src/middlewares/authMiddleware')

// import route
const loginRouter = require('./src/routes/public/loginRoutes')
const registerRouter = require('./src/routes/public/registerRoutes')
const adminRouter = require('./src/routes/adminRoutes')
const sellerRouter = require('./src/routes/sellerRoutes')
const custRouter = require('./src/routes/customerRoutes')

app.use('/auth', loginRouter)
app.use('/register', registerRouter)
app.use('/admin', authAdmin, adminRouter)
app.use('/seller', authSeller, sellerRouter)
app.use('/customer', authCust, custRouter)

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
