var recipes = require('./recipeController')
var db = require('../db');

module.exports = {
    query: function (req, res, next) {
        var data = req.body.data;

        db.getUser(data)
            .then(function (user) {
                var isOK = user.recipes.reduce(function (good, recipe) {
                    return recipe.logic.reduce(function (ok, logic) {
                        return recipes[logic.name](data, logic.args);
                    }, good)
                }, false);

                console.log('The user is', isOK);
            })
            .catch(function (e) {
                console.log(e);
            });
    }
}
