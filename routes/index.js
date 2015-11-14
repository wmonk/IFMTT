var webhookController = require('../controllers/webhookController')
var api = require('./api')

module.exports = function(app) {

  app.post('/webhook', webhookController.query)

  app.use('/api',api)

}
