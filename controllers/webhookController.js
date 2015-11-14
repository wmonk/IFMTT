var triggers = require('./triggerController')
var actions = require('./actionController')
var db = require('../db');

module.exports = {
    query: function (req, res, next) {
        var data = req.body.data;

        db.getUser(data.account_id)
            .then(function (user) {
                user.recipes.forEach(function (recipe) {
                	const triggersMatched = recipe.logic.every(trigger => {
						return triggers[trigger.name](data, trigger.args)
					})

					if (triggersMatched) {
						recipe.action.forEach(action => {
							actions[action.name](data, action.args)
						})
					}
                })
            })
            .catch(function (e) {
                console.log(e);
            });
    }
}
