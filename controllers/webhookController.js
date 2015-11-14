var triggers = require('./recipeController')

module.exports = {

	query: function(req, res, next) {
		// @TODO: check `isLoad: false`
		const data = req.body.data

		// const triggers = userController.getTriggers()
		const userTriggers = [
			{name: 'isGreaterThan', args: {amount: 20}},
			{name: 'isLessThan', args: {amount: 200}},
		]

		const triggersMatched = userTriggers.every(trigger => {
			return triggers[trigger.name](data, trigger.args)
		})

		console.log('triggersMatched:', triggersMatched)
		next()
	}
}
