var path = require('path');
var webhookController = require('../controllers/webhookController')
var api = require('./api')
var db = require('../db');
var request = require('request-promise')

module.exports = function (app) {

    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client', 'index.html')));

    app.post('/webhook', webhookController.query)

    app.use('/api', api)

    app.post('/login', (req, res) => {
        var username = req.body.username;
        var password = req.body.password;
        var oauthBody;
        var accountsBody;

        request('https://staging-api.gmon.io/oauth2/token', {
            method: 'POST',
            json: true,
            form: {
                grant_type: 'password',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                username: username,
                password: password
            }
        })
        .then((innerOauthBody) => {
            oauthBody = innerOauthBody;

            // Get the account id
            return request('https://staging-api.gmon.io/accounts', {
                json: true,
                auth: {
                    bearer: oauthBody.access_token
                }
            });
        })
        .then((innerAccountsBody) => {
            accountsBody = innerAccountsBody

            return db.getUser(accountsBody.accounts[0].id)
        })
        .then(function (user) {
            if (!user) {
                // Register this user for webhooks
                return request('https://staging-api.gmon.io/webhooks', {
                    method: 'POST',
                    json: true,
                    auth: {
                        bearer: oauthBody.access_token
                    },
                    form: {
                        account_id: accountsBody.accounts[0].id,
                        url: 'http://7c193598.ngrok.com/webhook'
                    }
                });
            }

            return user;
        })
        .then((webhooksBody) => {
            if (webhooksBody.recipes) {
                res.cookie('access_token', webhooksBody.access_token);
                return res.json({
                    message: 'User already created!'
                });
            }

            var userObj = Object.assign({
               _id: accountsBody.accounts[0].id
            }, oauthBody, accountsBody.accounts[0], webhooksBody);

            res.cookie('access_token', oauthBody.access_token);
            // TODO: save a cookie on the computer
            return db
                .createUser(userObj)
                .then(() => res.json({
                    message: 'User Created!'
                }));
        })
        .catch((err) => {
            res.json(err);
        });
    })

}
