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

        /*var path = '/apply/doGetApplyList.service';
        netService.doGet(path, null, '客户基本情况', req).then(function (result) {
            res.render('templates/customerInfo/customer_info', {
                data:JSON.stringify({
                    data:result.data
                })
            });
        }).catch(function (err) {
            console.log('error');
            res.redirect('/');
        });*/
        res.render('templates/guarantorAnalysis/guarantor_analysis', {
            data:JSON.stringify({
                data:[],
                index:3
            })
        });
    }
}
