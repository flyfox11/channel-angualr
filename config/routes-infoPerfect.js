var controllers = require('../app/controllers')

module.exports = function (app) {
    app.get('/infoPerfect/init', controllers.infoPerfect.init);
};
