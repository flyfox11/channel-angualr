let controllers = require('../app/controllers');

module.exports = function (app) {
    app.get('/file/download', controllers.file.download);
}