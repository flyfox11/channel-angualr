/**
 * 映射文件
 * 将请求路由到controllers的对象和方法上
 */
var controllers = require('../app/controllers')

module.exports = function (app) {
    app.get( '/auth'      , controllers.auth.init);
    app.post( '/auth'      , controllers.auth.biz);
};
