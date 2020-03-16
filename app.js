const express = require('express')
const bodyParser = require('body-parser')
const admin = require('./routes/admin')
const User = require('./model/user')
const cafeRoutes = require('./routes/cafe')
const rootDir = require('./utilities/rootDir')
const path = require('path')
const page404Controller = require('./controllers/error')
const mongoose = require('mongoose')
const connectionUri = require('./secrets').mongoConnectionUri

const app = express()


app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(rootDir, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  User.findById('5e6ffef56ae68b3310f0d465')
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => {
      console.log(err)
    })
})
app.use(admin.router)
app.use(cafeRoutes)
app.use('/', page404Controller.get404)

mongoose.connect(connectionUri)
  .then(result => {
    return User.findOne()
  })
  .then(user => {
    if (!user) {
      const user = new User({
        name: 'Dinika',
        email: 'dinikasaxenas@gmail.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })
  .then(() => {
    app.listen(4000)
  })
  .catch(err => {
    console.log(err)
  })
