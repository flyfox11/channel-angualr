var express = require('express');
var flash = require('connect-flash');
var crypto = require('crypto')
var qs = require('querystring');
var settings = require('../../config/settings');

var http = require("http");

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
/* 登录*/
module.exports = {
    init :function (req, res, next) {
        console.log("进入工作列表……");
        res.render('worklist', {
            title: '我的工作',
            slider:_menu,
            success:flash('success').toString(),
            error:flash('error').toString(),
            type:''

        });
    }
}
