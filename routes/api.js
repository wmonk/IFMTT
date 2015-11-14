var express = require('express')
	, router = express.Router()
	, recipeController = require('../controllers/recipeController')
	, actions = require('../controllers/actionController')

var toJSON = function(req, res) {
	console.log('??')
  var data = res.locals.data
  res.json(data)
}

router.route('/actions')
	.get(function(req, res, next) {
		var actionList = Object.keys(actions)
		res.json({
			actions: actionList
		})
	})

router.route('/:userId/recipes')
	.get(recipeController.list)
	.post(recipeController.post)

router.route('/:userId/recipes/:recipe')
	.get(recipeController.get)

router.all('/*', toJSON)

module.exports = router
