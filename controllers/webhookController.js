var triggers = require('./recipeController')
// var actions = require('./actionController')
var db = require('../db');

module.exports = {
    query: function (req, res, next) {
        var data = req.body.data;

        db.getUser(data)
            .then(function (user) {
                user.recipes.forEach(function (recipe) {
                	const triggersMatched = recipe.logic.every(trigger => {
						return triggers[trigger.name](data, trigger.args)
					})

					// if (triggersMatched) actions[recipe.action.name](data, trigger.args, action)
                })
            })
            .catch(function (e) {
                console.log(e);
            });
    }
}
