var netService = require('../service/netService');

/* 登录*/
module.exports = {
    init: function (req, res, next) {

        res.render('login', {
            title: '登录'
        });
    },

    doLogin: function (req, res, next) {
        /*let url = '/channelUserController/doLogin.service';
        netService.doPost(url, req.body, '用户登录', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.session.user = data.data.ChannelUser;
                res.redirect('/company/companyQueryView')
            } else {
                req.flash('Dialog', {title: '错误', content: data.msg});
                req.flash('cname', req.body.cname);
                res.redirect('/');
            }
        }).catch(function (err) {
            console.log(err);
            req.flash('Dialog', err);
            res.redirect('/');
        });*/
        res.redirect('/report');

    },
    logout: function (req, res, next) {
        req.session.user = null;
        res.redirect('/')
    }
}
