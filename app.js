#!/usr/bin/env node

var express = require('express');
var path = require('path');
var debug = require('debug')('loan:server');
var environment = require('./config/environment');

var http = require('http');
var https = require('https');
var fs = require('fs');
var settings=require('./config/settings');

var routes = require('./config/routes');
var file = require('./config/routes-file');

var common=require('./config/routes-common');
var app = express();


//初始化环境
environment(app);

//登录相关
routes(app);

//权限认证
/*app.use(function (req,res,next) {
    if(!!req.session.user){
        next();
    }else{
        req.flash('Dialog', {
            title: '提示',
            content: 'session失效，请重登'
        });
        res.redirect('/');
    }
});*/



//文件下载
file(app)

//我的路由
common(app);
// 使用 handler 处理404错误
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理的 handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.log(err.stack);
    res.render('error');
});


/**
 * http-https配置
 */
settings.HTTP_ON&&setHttp();
settings.HTTPS_ON&&setHttps();



//set http server
function setHttp(){
    var httpServer = http.createServer(app);
    httpServer.listen(settings.HTTP_PORT, function() {
        console.log('渠道管理子系统HTTP Server is running on: http://%s:%s', settings.server_host,settings.HTTP_PORT);
    });
    httpServer.on('error',onError);
}
//set https server
function setHttps() {
    var privatekey = fs.readFileSync('privatekey.pem', 'utf8');
    var certificate = fs.readFileSync('certificate.pem', 'utf8');
    var options={key:privatekey, cert:certificate};
    var httpsServer = https.createServer(options, app);
    httpsServer.listen(settings.HTTPS_PORT, function() {
        console.log('渠道管理子系统HTTPS Server is running on: https://%s:%s', settings.server_host,settings.HTTPS_PORT);
    });
    httpsServer.on('error',onError);
}

/*
  app.set('port', process.env.PORT || 3009);
var server = app.listen(app.get('port'), function () {
    console.log('渠道管理子系统 ' + server.address().port);
});
server.on('error', onError);*/

/**
 * Event listener for HTTP server "error" event.
 * server 的 error 事件的监听处理函数
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    //处理特殊error 的友好信息
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(' 端口被占用!');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
module.exports = app;
