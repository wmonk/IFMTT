var actions = require('./actionController')
var db = require('../db')

var getActions = () => Object.keys(actions)
var esc = (str) => str.toLowerCase().replace(/\s+/g, '-')

module.exports = {
	list: function(req, res, next) {

		db.getUser(req.params.userId)
            .then(function (user) {
                res.locals.data = user.recipes
                next()
            })
	},

    post: function (req, res, next) {
        db.getUserCollection()
            .then(users => {
                console.log('users', users)
                return users.update({
                    _id: req.params.userId
                }, {
                    $push: {
                        recipes: req.body
                    }
                })
            })
            .then(function() {
                res.locals.data = {}
            })
            .catch(function(err) {
                console.log(err)
            })
            .finally(function() {
                next()
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
