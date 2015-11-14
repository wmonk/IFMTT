module.exports = {
    console: function (transaction, arguments) {
        console.log(arguments['text']);
    },
    
    sms: function (transaction, arguments) {
        var client = require('twilio')('ACec0cfc8e3e2d9517e11a5caac4434e02', 'ea4d7a12981d4ab0da7c7b8a9e5e1e0b');
        client.sendMessage({
            to: arguments['phone_number'],
            from: '+441635800256',
            body: arguments['text']
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
