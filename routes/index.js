var path = require('path');
var webhookController = require('../controllers/webhookController')
var api = require('./api')
var db = require('../db');
var request = require('request-promise')

module.exports = function(app) {

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client', 'index.html')));

  app.post('/webhook', webhookController.query)

  app.use('/api', api)

  app.post('/login', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;

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
      }).then((oauthBody) => {
          var accessToken = oauthBody.access_token;
          var userId = oauthBody.user_id;
          // Get the account id
          request('https://staging-api.gmon.io/accounts', {
              json: true,
              auth: {
                  bearer: accessToken
              }
          }).then((accountsBody) => {
              var accountId = accountsBody.accounts[0].id;
              // Register this user for webhooks
              request('https://staging-api.gmon.io/webhooks', {
                  method: 'POST',
                  json: true,
                  auth: {
                      bearer: accessToken
                  },
                  form: {
                      account_id: accountId,
                      url: 'http://7c193598.ngrok.com/webhook'
                  }
              }).then((webhooksBody) => {
                  // TODO: save a cookie on the computer
                  // TODO: create a user entry in the database
                  db
                    .createUser(Object.assign({_id: accountId}, oauthBody, accountsBody.accounts[0], webhooksBody))
                    .then(() => res.json({ message: 'User Created!' }))
                    .catch(e => res.json(e));
              }).catch((err) => {
                  res.json(err);
              });
          }).catch((err) => {
              res.json(err);
          });
      }).catch((err) => {
          res.json(err);
      });
  })

}
