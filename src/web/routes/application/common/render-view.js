const renderView = (template, pageContent, redirect) => (req, res) => {
  if (req.method === 'POST' && !res.locals.errors) {
    return res.redirect(redirect)
  }

  res.render(template, {
    ...pageContent,
    csrfToken: req.csrfToken()
  })
}

module.exports = {
  renderView
}