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

        var path = '/product/doGetProductList.service';
        netService.doGet(path, null, '客户结构收款方式', req).then(function (result) {
            res.render('templates/nonFinancialFactors/non_financial_fators', {
                data:JSON.stringify({
                    data:result.data,
                    index:1
                })
            });
        }).catch(function (err) {
            res.render('login',{
                error:err
            })
        });
    }
}
