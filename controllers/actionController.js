const mustache = require('mustache')

const currencyToSymbol = function(currency) {
    const symbols = {
        GBP:'£',
        USD:'$',
        EUR:'€',
    }
    return symbols[currency] || '?'
}

const renderTemplate = function(text, transaction) {
    const containsTags = /\{{([^{}]+)}\}/.test(text)
    if (!containsTags) return text

    const symbol = currencyToSymbol(transaction.currency)
    transaction.amount = symbol+(transaction.amount*-1)
    return mustache.render(text, transaction)
}

module.exports = {
    console: function (transaction, arguments) {
        const text = renderTemplate(arguments.text, transaction)
        console.log(text);
    },
    
    sms: function (transaction, arguments) {
        var client = require('twilio')(process.env.TWILIO_ACC, process.env.TWILIO_SECRET);
        const body = renderTemplate(arguments.text, transaction)
        client.sendMessage({
            to: arguments['phone_number'],
            from: process.env.TWILIO_NUMBER,
            body,
        }, function(err, responseData) {
            if (!err) {
                console.log(responseData.from);
                console.log(responseData.body);
            } else {
                console.log(err);
            }
        });
    }
}
