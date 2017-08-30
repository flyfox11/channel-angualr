var controllers = require('../app/controllers')

module.exports = function (app) {
    app.get('/system/init', controllers.system.init);
    app.get('/system/channelInfo', controllers.system.channelInfo);//用户资料  渠道信息
    app.get('/system/userInfo', controllers.system.userInfo);//用户资料  登录用户信息
    app.get('/system/editUserInfo', controllers.system.editUserInfo);//修改信息
    app.post('/system/changePwd', controllers.system.changePwd);//修改密码
    app.get('/system/resetPwd', controllers.system.resetPwd);//重置密码
};
