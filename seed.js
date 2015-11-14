var md = require('mongodb-promise').MongoClient;

md.connect('mongodb://localhost:27017/ifmtt')
    .then(function (db) {
        return db.collection('users');
    })
    .then(function (users) {
        return users.insert({
            _id: process.argv[2],
            recipes: [{
                name: 'Greater than console',
                logic: [{
                    name: 'greaterThan',
                    args: {
                        amount: 100
                    }
                }],
                action: [{
                    name: 'console',
                    args: {
                        text: 'Naughty, naughty! You\'re spending a lot of money!!'
                    }
                },{
                    name: 'sms',
                    args: {
                        phone_number: '+447780855647',
                        text: 'Naughty, naughty! You\'re spending a lot of money!!'
                    }
                }]
            },{
                logic: [{
                    name: 'greaterThan',
                    args: {
                        amount: 10
                    }
                }, {
                    name: 'before',
                    args: {
                        hours: 20,
                        minutes: 0
                    }
                }, {
                    name: 'after',
                    args: {
                        hours: 13,
                        minutes: 0
                    }
                }],
                action: [{
                    name: 'console',
                    args: {
                        text: 'Hey, stop spending money so late at night!!'
                    }
                },{
                    name: 'sms',
                    args: {
                        phone_number: '+447780855647',
                        text: 'Hey, stop spending money so late at night!!'
                    }
                }]
            }]
        });
    })
    .then(function () {
        console.log('Done!');
    });
