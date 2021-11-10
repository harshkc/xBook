function proxy(app) {
  app.get(/^\/$/, (req, res) => res.redirect('/list'))
  app.head(/^\/list$/, (req, res) => res.status(200).end())
}

module.exports = proxy
