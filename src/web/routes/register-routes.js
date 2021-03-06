const { registerCookiesRoute } = require('./cookies')
const { registerPrivacyNoticeRoute } = require('./privacy-notice')
const { getLanguageBase } = require('./language')
const { registerHoldingRoute } = require('./holding')
const { registerPageNotFoundRoute } = require('./page-not-found')
const { registerGuidanceRoutes } = require('./guidance')
const { registerJourneys } = require('./application')

const setCommonTemplateValues = (req, res, next) => {
  res.locals.htmlLang = req.language
  res.locals.language = getLanguageBase(req.language)
  res.locals.cookieLinkName = req.t('cookies.linkName')
  res.locals.privacyNoticeLinkName = req.t('privacyNotice.linkName')
  res.locals.back = req.t('back')
  next()
}

const registerRoutes = (config, app) => {
  app.use(setCommonTemplateValues)

  if (config.environment.MAINTENANCE_MODE) {
    registerHoldingRoute(config, app)
  } else {
    registerJourneys(config, app)
    registerCookiesRoute(app)
    registerPrivacyNoticeRoute(app)
    registerGuidanceRoutes(app)

    // Page not found route should always be registered last as it is a catch all route
    registerPageNotFoundRoute(app)
  }
}

module.exports = {
  registerRoutes
}
