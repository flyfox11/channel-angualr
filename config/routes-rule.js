/**
 * 映射文件
 * 将请求路由到controllers的对象和方法上
 */
var controllers = require('../app/controllers')

module.exports = function (app) {
  app.get( '/customer'      , controllers.customer.init);
  app.post( '/customer'      , controllers.customer.biz);
  app.get(  '/'           , controllers.login.init);
  app.post( '/doLogin'      , controllers.login.doLogin);
};
