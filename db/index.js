var mdb = require('mongodb-promise').MongoClient;
var db;

var url = 'mongodb://localhost:27017/ifmtt';
mdb.connect(url)
    .then(function (innerDb) {
        db = innerDb;
    });

exports.getUser = function (transaction) {
    return db.collection('users')
        .then(function (users) {
            return users.findOne({ _id: transaction.account_id })
        })
        .then(function (recipes) {
            return recipes;
        });
}
