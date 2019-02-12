const httpStatus = require('http-status-codes')

const logErrors = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

// eslint-disable-next-line handle-callback-err
const errorHandler = (err, req, res, next) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR)

  res.render('error', {
    title: req.t('errors:problemWithTheServiceTitle'),
    heading: req.t('errors:problemWithTheServiceTitle'),
    content: req.t('errors:problemWithTheServiceContent')
  })
}

const registerErrorHandlers = (app) => {
  app.use(logErrors)
  app.use(errorHandler)
}

module.exports = {
  errorHandler,
  registerErrorHandlers
}
