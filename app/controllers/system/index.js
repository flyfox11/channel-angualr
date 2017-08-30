/**
 * Created by home on 2017/5/17.
 */
var netService = require('../../service/netService');

/*企业信息*/

module.exports = {
    init: function (req, res, next) {
        res.render('system/init', {
            title: '系统管理',
            showTob: {title: '用户资料'}
        });
    },
    channelInfo: function (req, res, next) {
        let url = '/channel/channelInfo.service';
        netService.doGet(url, {channel_no: req.session.user.channel_id}, '渠道信息', res).then(function (data) {
            res.render('system/channelInfo', {
                title: '系统管理',
                showTob: {title: '用户信息'},
                data: data.data || {}
            });
        }).catch(function (err) {
            res.render('system/channelInfo', {
                title: '系统管理',
                showTob: {title: '用户信息'},
                Dialog: err
            });
        });
    },
    userInfo: function (req, res, next) {
        res.render('system/userInfo', {
            title: '系统管理',
            showTob: {title: '用户资料'}
        });
    },
    editUserInfo: function (req, res, next) {
        res.render('system/editUserInfo', {
            title: '系统管理',
            showTob: {title: '修改信息'}
        });
    },
    changePwd: function (req, res, next) {
        let url = '/channelUserController/modifyPwd.service';
        req.body.userName = req.session.user.cname;
        netService.doPost(url, req.body, '修改密码', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: data.msg
                });
                req.session.user = null;
                res.redirect('/')
            } else {
                req.flash('pwdDialog', {
                    title: '失败',
                    content: data.msg
                });
                res.redirect(req.body.redirectUrl);
            }
        }).catch(function (err) {
            req.flash('pwdDialog', err);
            res.redirect(req.body.redirectUrl);
        });
    },
    resetPwd: function (req, res, next) {
        let url = '/channelUserController/UpdateByReset.service';
        let data_param = {
            cid: req.session.user.cid
        };
        netService.doGet(url, data_param, '重置密码', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: data.msg
                });
                req.session.user = null;
                res.redirect('/');
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: data.msg
                });
                res.redirect('/system/editUserInfo');
            }
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/system/editUserInfo');
        });
    }
}
