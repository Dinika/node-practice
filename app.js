const express = require('express')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
// const cafeRoutes = require('./routes/cafe')
const rootDir = require('./utilities/rootDir')
const path = require('path')
const page404Controller = require('./controllers/error')
const mongoConnect = require('./utilities/database').mongoConnect

const app = express()


app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(rootDir, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(admin.router)
// app.use(cafeRoutes)
// app.use('/', page404Controller.get404)

mongoConnect(() => {
  app.listen(4000)
})
