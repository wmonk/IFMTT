var actions = require('./actionController')
var db = require('../db')

var getActions = () => Object.keys(actions)
var esc = (str) => str.toLowerCase().replace(/\s+/g, '-')

module.exports = {
	list: function(req, res, next) {

		db.getUser(req.params.userId)
            .then(function (user) {
                res.locals.data = user.recipes
            })
	},

    post: function (req, res, next) {
        db.getUser(req.params.userId)
            .then(function (user) {
                console.log(user)
            })
    },

    get: function(req, res, next) {
        db.getUser(req.params.userId)
            .then(function(user) {
                var recipe = user.recipes.filter(recipe => req.params.recipe === esc(recipe.name))[0]
                res.locals.data = recipe
                next()
    		})
    }
}
