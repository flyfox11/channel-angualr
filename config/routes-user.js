/**
 * 映射文件
 * 将请求路由到controllers的对象和方法上
 */
var controllers = require('../app/controllers')

module.exports = function (app) {
  app.get( '/user'      , controllers.user.init);
  app.post( '/user'      , controllers.user.biz);
};
