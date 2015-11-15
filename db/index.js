var mdb = require('mongodb-promise').MongoClient;
var db;

var url = 'mongodb://localhost:27017/ifmtt';
mdb.connect(url)
    .then(function (innerDb) {
        db = innerDb;
    });

exports.getUserRecipes = function (id) {
    return db.collection('users')
        .then(function (users) {
            return users.findOne({ _id: id })
        })
        .then(function (recipes) {
            return recipes;
        });
}

exports.getUser = function (id) {
    return db.collection('users')
        .then(function (users) {
            return users.findOne({ _id: id })
        });
}

exports.createUser = function (user) {
    return db.collection('users')
        .then(function (users) {
            return users.insert(Object.assign({
                _id: user.id
            }, user, {
                id: undefined,
                recipes: []
            }));
        })
}

exports.getUserCollection = function (id) {
    return db.collection('users')
}
