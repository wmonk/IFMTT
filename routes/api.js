var express = require('express')
	, router = express.Router()
	, recipeController = require('../controllers/recipeController')

var toJSON = function(req, res) {
	console.log('??')
  var data = res.locals.data
  res.json(data)
}

router.route('/:userId/recipes')
	.get(recipeController.list)
	.post(recipeController.post)

router.route('/:userId/recipes/:recipe')
	.get(recipeController.get)

router.all('/*', toJSON)

module.exports = router
