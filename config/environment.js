var path = require('path');
var express = require('express');
var settings = require('./settings');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var nunjucks = require('nunjucks');

module.exports = function (app) {
    app.use(express.static(path.join('public')));
    app.use(express.static(path.join('webapp')));
    //app.engine('ejs', require('ejs-locals'));// use ejs-locals for all ejs templates:
    // app.set('views', path.join('views'));
    // app.set('view engine', 'ejs');
    nunjucks.configure(path.join('views'), { // 设置模板文件的目录，为views
        autoescape: true,
        express: app
    });
    app.set('view engine', 'html'); // 模板文件的后缀名字为html
    app.use(favicon(path.join('public', 'favicon.jpg')));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
            secret: 'qu dao',
            resave: true,
            saveUninitialized: true,
            cookie: {
                maxAge: 30 * 60 * 1000  //session过期时间
            },
            name: 'sub-app'
        }
    ));
    app.use(flash());
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        let Dialog = req.flash('Dialog');
        Dialog = !!Dialog && !!Dialog.length ? Dialog[0] : '';
        res.locals.Dialog = Dialog;
        let pwdDialog = req.flash('pwdDialog');
        pwdDialog = !!pwdDialog && !!pwdDialog.length ? pwdDialog[0] : '';
        res.locals.pwdDialog = pwdDialog;
        next();
    });

};
