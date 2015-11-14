var webhookController = require('../controllers/webhookController')

module.exports = function(app) {

  app.post('/webhook', webhookController.query)

}
