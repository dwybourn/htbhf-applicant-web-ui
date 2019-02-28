const express = require('express')

const {
  configureGet,
  configurePost,
  getSessionDetails,
  handlePost,
  renderView,
  sanitize
} = require('./middleware')

const middlewareNoop = (req, res, next) => next()

const handleOptionalMiddleware = (operation, fallback = middlewareNoop) => {
  if (typeof operation === 'undefined') {
    return fallback
  }

  return operation
}

const createRoute = (csrfProtection, steps, router) => (step) =>
  router
    .route(step.path)
    .get(
      csrfProtection,
      configureGet(steps, step),
      getSessionDetails,
      renderView(step.template, step.pageContent, step.next)
    )
    .post(
      csrfProtection,
      configurePost(steps, step),
      sanitize,
      handleOptionalMiddleware(step.sanitize),
      handleOptionalMiddleware(step.validate),
      getSessionDetails,
      handlePost,
      renderView(step.template, step.pageContent, step.next)
    )

const registerFormRoutes = (csrfProtection, steps, app) => {
  const wizard = express.Router()
  steps.forEach(createRoute(csrfProtection, steps, wizard))
  app.use(wizard)
}

module.exports = {
  registerFormRoutes,
  handleOptionalMiddleware
}
