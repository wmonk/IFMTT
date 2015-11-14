module.exports = {

	isGreaterThan: function(transaction, arguments) {
		return (transaction.amount*-1) > arguments.amount
	},

	isLessThan: function(transaction, arguments) {
		return (transaction.amount*-1) < arguments.amount
	}

}
