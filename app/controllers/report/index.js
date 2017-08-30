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

        /*var path = '/apply/doGetApplyList.service';

        netService.doGet(path, null, '客户基本情况', req).then(function (result) {
            res.render('templates/customerInfo/customer_info', {
                data:JSON.stringify({
                    data:result.data,
                    index:0
                })
            });
        }).catch(function (err) {
            /!*req.flash('Dialog', err);
            res.redirect('/');*!/
            res.render('login',{
                error:err
            })
        });*/
        res.render('templates/report/index', {
            data:JSON.stringify({
                data:'',
                index:0
            })
        });
    },
    query:function (req,res,next) {
        var path = '/apply/doGetApply.service';
        var postBody={
            company_name:req.query.company_name,
            pageNum:1
        }
        netService.doPost(path, postBody, '查询报告列表', req).then(function (result) {
            res.render('templates/report/report_list', {
                data:JSON.stringify({
                    data:result.data,
                    index:0
                }),
                queryBody:req.query
            });
        }).catch(function (err) {
            /*req.flash('Dialog', err);
            res.redirect('/');*/
            res.render('login',{
                error:err
            })
        });

    },
    detail:function (req,res,next) {
        var path = '/company/doGetCompanyMessage.service?company_id='+req.query.company_id;
        netService.doGet(path, null, '报告详细信息', req).then(function (result) {
            res.render('templates/report/report_tabs', {
                data:JSON.stringify({
                    data:result.data,
                    index:0,
                    company_id:req.query.company_id,
                    company_name:req.query.company_name,
                })
            });
        }).catch(function (err) {
            /*req.flash('Dialog', err);
             res.redirect('/');*/
            res.render('login',{
                error:err
            })
        });
    },
    add:function (req,res,next) {
        res.render('templates/report/report_tabs_add', {
            data:JSON.stringify({
                index:0,
            })
        });
    }

}
