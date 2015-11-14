var webhookController = require('../controllers/webhookController')
var recipeController = require('../controllers/recipeController')

module.exports = function(app) {

  app.post('/webhook', webhookController.query)

  app.route('/api/:userId/recipes')
  	.get(recipeController.list)
  	.post(recipeController.post)

  app.route('/api/:userId/recipes/:recipe')
  	.get(recipeController.get)

}
