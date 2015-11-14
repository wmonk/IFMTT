var path = require('path');
var webhookController = require('../controllers/webhookController')
var api = require('./api')

module.exports = function(app) {

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client', 'index.html')));

  app.post('/webhook', webhookController.query)

  app.use('/api',api)


}
