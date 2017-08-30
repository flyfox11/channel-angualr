angular.module("subApp",
    [
        'subApp.services',
        'subApp.directives',
        'ngResource',
        'ui.bootstrap'
    ]).run(function ($timeout) {
        //TODO 关闭Loading动画

    }).config(function ($interpolateProvider,$httpProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    //API统一为JSON格式
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    //$httpProvider.defaults.headers.post["Content-Type"] = "text/plain";
    //Reset headers to avoid OPTIONS request (aka preflight)
   /* $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};*/
    $httpProvider.interceptors.push(function($q) {
        return {
            'request': function(config) {
               // config.params&&(config.params.userName='huzf');
                return config;
            },
            'response': function(response) {
                // do something on success
                if(!!response.data && response.data.hasOwnProperty('status')&& response.data.status!==200){
                    var message=response.data.msg;
                    message=message.length>100?message.slice(0,100):message;
                    jDialog.alert(message);
                     return $q.reject(message);
                }else{
                    return response || $q.when(response);
                }
            },
            'responseError': function(rejection) {
                // do something on error
                rejection.statusText==''&&(rejection.statusText='未连接到服务器');
                jDialog.dialog({
                    title: '服务器错误',
                    content: '状态码:'+rejection.status+'<br>错误描述:'+rejection.statusText,
                    buttons: [
                        {
                            type: 'highlight',
                            text: '确定',
                            handler: function (button, dialog) {
                                dialog.close();
                            }
                        }
                    ]
                });
                return $q.reject(rejection.statusText);
            }
        };
    });

}).constant('ApiConfig', {
     'API_HOST': 'http://'+window.location.hostname+':8081',       //API服务器-本地开发环境
    //'API_HOST': 'http://10.0.2.5:8080'       //API服务器-测试开发环境
});
angular.module('subApp.services', []);
angular.module('subApp.directives', []);



