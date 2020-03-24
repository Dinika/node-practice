const throwError = (err, next, errorStatusCode = 500) => {
  const error = new Error(err)
  error.httpStatusCode = errorStatusCode
  next(error)
  return
}

module.exports = throwError