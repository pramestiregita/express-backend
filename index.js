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
const homeRouter = require('./src/routes/public/homeRoutes')
const categoriesRouter = require('./src/routes/public/categoriesRoutes')
const authRouter = require('./src/routes/public/authRoutes')
const adminRouter = require('./src/routes/adminRoutes')
const sellerRouter = require('./src/routes/sellerRoutes')
const custRouter = require('./src/routes/customerRoutes')

app.use('/home', homeRouter)
app.use('/category', categoriesRouter)
app.use('/auth', authRouter)
app.use('/admin', authAdmin, adminRouter)
app.use('/seller', authSeller, sellerRouter)
app.use('/customer', authCust, custRouter)

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
