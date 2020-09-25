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
const rolesRouter = require('./src/routes/manageRoles')
const usersRouter = require('./src/routes/manageUsers')
const userDetailsRouter = require('./src/routes/manageUserDetails')

app.use('/manage/roles', rolesRouter)
app.use('/manage/users', usersRouter)
app.use('/manage/user_detail', userDetailsRouter)

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`)
})
