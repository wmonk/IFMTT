var moment = require('moment')

module.exports = {

    greaterThan: function (transaction, arguments) {
        return (-1 * parseInt(transaction.amount, 10)) > arguments.amount;
    },

    lessThan: function (transaction, arguments) {
        return (-1 * parseInt(transaction.amount, 10)) < arguments.amount;
    },
    
    before: function (transaction, arguments) {
        var date = moment(transaction.created);
        return date.hour() < arguments['hours'] 
            || (date.hour() == arguments['hours'] && date.minute() < arguments.minutes);
    },

    after: function (transaction, arguments) {
        var date = moment(transaction.created);
        return date.hour() > arguments['hours'] 
            || (date.hour() == arguments['hours'] && date.minute() > arguments.minutes);
    },
    
    station: function (transaction, arguments) {
        return transaction.merchant.name == 'Transport For London' && transaction.merchant.address.city.toLowerCase() == arguments.station.toLowerCase();
    },

}
