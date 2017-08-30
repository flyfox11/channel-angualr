var express = require('express');
var flash = require('connect-flash');
var crypto = require('crypto');
var http = require("http");
var netService = require('../../service/netService');
var formidable = require('formidable');
var settings=require('../../../config/settings');

/* 客户管理*/

module.exports = {

    init: function (req, res, next) {

        //var current = req.query.current || 1;

        var path = '/apply/doGetApplyList.service';

        netService.doGet(path, null, '客户基本情况', req).then(function (result) {
            res.render('templates/customerInfo/customer_info', {
                data:JSON.stringify({
                    data:result.data,
                    index:0
                })
            });
        }).catch(function (err) {
            /*req.flash('Dialog', err);
            res.redirect('/');*/
            res.render('login',{
                error:err
            })
        });

    }
}
