var express = require('express');
var flash = require('connect-flash');
var crypto = require('crypto');


var _menu = [
    {
        "name":"客户管理",
        "url":"/customer"
    },
    {
        "name":"额度管理",
        "url":"/limit"
    },
    {
        "name":"订单管理",
        "url":"/order"
    },
    {
        "name":"项目管理",
        "url":"/project"
    },
    {
        "name":"贷款管理",
        "url":"/loan"
    },
    {
        "name":"产品管理",
        "url":"/product"
    }
];

/* 代码管理*/

module.exports = {

    init:function (req, res, next) {
        console.log('进入----代码管理!');
        res.render('common/code/code_index',{
            title: '代码管理',
            slider:_menu,
            success:flash('success').toString(),
            error:flash('error').toString(),
            type:""

        });

    },
    biz:function (req,res,next) {
        console.log('代码管理!  开始……');

        var md5 = crypto.createHash('md5');
        var _login_code = req.body.login_code;
        var _password = req.body.password;
        var password = md5.update(_password).digest('hex');
        console.log('User:%s,PWD:%',_login_code,_password);
        console.log('PWD %s', password );

        var user = {
            login_code:_login_code,
            pwd:password,
            real_name:'赵强'
        };


        req.session.user = user;

        res.render('product/pro_home',{
            title: '产品管理',
            user:req.session.user,
            menu:_menu,
            success:flash('success').toString(),
            error:flash('error').toString()

        });

    }
}
