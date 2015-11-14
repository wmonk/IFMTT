var recipes = require('./recipeController')
var db = require('../db');

module.exports = {
    query: function (req, res, next) {
        var data = req.body.data;

        db.getUser(data)
            .then(function (user) {
                user.recipes.forEach(function (recipe) {
                    recipe.logic.forEach(function (logic) {
                        var isGood = recipes[logic.name](data, logic.args);

                        console.log(logic.name, 'is', isGood);
                    })
                })
            })
            .catch(function (e) {
                console.log(e);
            });
    }
}
