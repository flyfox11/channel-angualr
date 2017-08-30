/**
 * Created by home on 2017/5/17.
 */
var netService = require('../../service/netService');

/*企业信息*/

module.exports = {
    init: function (req, res, next) {
        res.render('userData/init', {
            title: '用户数据',
            showTob: {smallTitle: '用户导入'}
        });
    },
    info: function (req, res, next) {
        res.render('userData/info', {
            title: '用户数据',
            showTob: {smallTitle: '用户信息'}
        });
    },
    history: function (req, res, next) {
        res.render('userData/history', {
            title: '用户数据',
            showTob: {smallTitle: '导入历史'}
        });
    },
    upload: function (req,res,next) {
        console.log(req.file);
        res.render('userData/info', {
            title: '用户数据',
            showTob: {smallTitle: '用户信息'}
        });
    }
}

