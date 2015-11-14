module.exports = {
  isGreaterThan: function(transaction, arguments) {
  	console.log(transaction.amount, arguments.amount)
  	return transaction.amount > arguments.amount
  }
}
