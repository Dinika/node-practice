const Product = require('../model/product')
const Cart = require('../model/cart')

exports.getProducts = (req, res, next) => {
  Product
    .findAll()
    .then(products => {
      res.render('cafe/product-list.pug', { products: products, path: '/', pageTitle: 'Cafe' })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId
  Product
    .findByPk(productId)
    .then((product) => {
      res.render('cafe/product-detail.pug', { product: product, path: '/products' })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      console.log(cart)
      return cart.getProducts()
    })
    .then(productsInCart => {
      res.render('cafe/cart.pug', { path: '/cart', pageTitle: 'Cart', productsInCart: productsInCart, totalPrice: 0 })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  let fetchedCart
  let newQuantity
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      const product = products.length > 0 ? products[0] : null
      newQuantity = product ? product.cartItem.quantity + 1 : 1
      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => {
      console.log(err)
    })
}

exports.orders = (req, res, next) => {
  res.render('cafe/orders.pug', { path: '/orders', pageTitle: 'Orders' })
}

exports.deleteCartProduct = (req, res, next) => {
  Cart.deleteProduct(req.body.productId, Number(req.body.price))
  res.redirect('/')
}