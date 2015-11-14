module.exports = {

    greaterThan: function (transaction, arguments) {
        return (-1 * parseInt(transaction.amount, 10)) > arguments.amount
    },

    lessThan: function (transaction, arguments) {
        return (-1 * parseInt(transaction.amount, 10)) < arguments.amount
    },

}
