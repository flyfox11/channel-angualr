/**
 * 映射文件
 * 将请求路由到controllers的对象和方法上
 */
var controllers = require('../app/controllers')

module.exports = function (app) {
    app.get( '/log'      , controllers.log.init);
    app.post( '/log'      , controllers.log.biz);
};
