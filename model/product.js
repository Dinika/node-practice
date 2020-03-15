const getDB = require('../utilities/database').getDB
const mongoDb = require('mongodb')

class Product {
  constructor(name, price, description, imageUrl, _id) {
    this.name = name
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = new mongoDb.ObjectId(_id)
  }

  save() {
    const db = getDB()
    let dbOp
    if (this._id) {
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this })
    } else {
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(id) {
    const db = getDB()
    return db
      .collection('products')
      .find({ _id: new mongoDb.ObjectId(id) })
      .next()
      .then(product => {
        return product
      })
      .catch(err => {
        console.log(err)
      })
  }

  static fetchAll() {
    const db = getDB()
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }

  static delete(id) {
    const db = getDB()
    db.collection('products')
      .deleteOne({ _id: new mongoDb.ObjectId(id) })
  }
}

module.exports = Product


// const Sequelize = require('sequelize')
// const sequelize = require('../utilities/database')

// const Product = sequelize.define(
//   'product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// }
// )

