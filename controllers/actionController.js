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
    },
    
    feedItem: function (transaction, arguments) {
        var db = require('../db');
        var request = require('request-promise')
        db.getUser(transaction.account_id).then((user) => {
            return request('https://staging-api.gmon.io/feed', {
                method: 'POST',
                json: true,
                auth: {
                    bearer: user.access_token
                },
                form: {
                    type: 'basic',
                    account_id: transaction.account_id,
                    url: 'www.google.com',
                    params: {
                        title: arguments.title,
                        body: arguments.body,
                        image_url: arguments.image_url,
                        background_color: '#EEEEEE',
                        body_color: '#777',
                        title_color: '#333',
                    }
                }
            })
        })        
        .then((respo) => {
            console.log(respo);
        })
        .catch((err) => {
            console.log(err);
        });
    },
}
