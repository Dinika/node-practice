const Product = require('../model/product')
const mongodb = require('mongodb')

exports.getAddProduct = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/login')
  }
  res.render('admin/edit-product', { path: '/admin/add-product', pageTitle: 'Add product', isLoggedIn: req.session.isLoggedIn })
}

exports.postAddProduct = (req, res, next) => {
  const { name, price, imageUrl, description } = req.body
  const product = new Product({ name, price, imageUrl, description, userId: req.user })

  product
    .save()
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).redirect('/404')
      }
      res.render('admin/edit-product', { path: '', pageTitle: 'Edit product', product: product, editMode: true, isLoggedIn: req.session.isLoggedIn })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.productId
  if (!productId) {
    return res.status(404).redirect('/404')
  }
  Product.findById(productId)
    .then(product => {
      // There must be a smarter way of doing this
      product.name = req.body.name
      product.description = req.body.description
      product.imageUrl = req.body.imageUrl
      product.price = req.body.price
      return product.save()
    })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId
  Product
    .findByIdAndRemove(productId)
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getAdminProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      res.render('admin/products.pug', { products: products, path: '/admin/products', pageTitle: 'Admin', isLoggedIn: req.session.isLoggedIn })
    })
    .catch(err => {
      console.log(err)
    })
}