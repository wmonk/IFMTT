var recipes = require('./recipeController')

module.exports = {

  query: function(req, res, next) {
  	var data = req.body.data

  	var args = {
  		amount: -20
  	}

  	recipes['isGreaterThan'](data, args)
  }
}
