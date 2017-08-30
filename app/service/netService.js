const netService = module.exports = {};
var request = require('request');
var qs = require('querystring');
var settings = require('../../config/settings');
var lib = require('../../lib');
var defaultPort = 8081;


//post 方法
netService.doPost = function (path, params, logMessage, res) {
    logMessage && console.log('---进入', logMessage, '--');
    var url = 'http://' + settings.server_host + ':' + defaultPort + path;
    /*params.token = !!res.locals.session.user ? res.locals.session.user.tokenId : '';*/
    return new Promise(function (resolve, reject) {
        request.post({url: url, form: params}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            }
            else if (error) {
                var Dialog = {};
                Dialog.title = error.code || '确定';
                Dialog.content = error.message || '操作失败';
                reject(Dialog);
            } else {
                var Dialog = {};
                Dialog.title = response.statusCode || lib.outPutStatusCode(response.body);
                Dialog.content = lib.outPutMessage(response.body) || '操作失败';
                reject(Dialog);
            }
        })
    })
}

//get 方法（如果params参数没有，要传入logMessage,可以给params传null）
netService.doGet = function (path, params = {}, logMessage, res) {
    logMessage && console.log('---进入', logMessage, '--');
    var url = 'http://' + settings.server_host + ':' + defaultPort + path;
    /*params.token = !!res.locals.session.user ? res.locals.session.user.tokenId : '';
    if (params) {
        url += '?' + qs.stringify(params);
    }*/
    return new Promise(function (resolve, reject) {
        request.get({url: url}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            }
            else if (error) {
                var Dialog = {};
                Dialog.title = error.code || '确定';
                Dialog.content = error.message || '操作失败';
                reject(Dialog);
            } else {
                var Dialog = {};
                Dialog.title = response.statusCode || lib.outPutStatusCode(response.body);
                Dialog.content = lib.outPutMessage(response.body) || '操作失败';
                reject(Dialog);
            }
        })
    })
}







