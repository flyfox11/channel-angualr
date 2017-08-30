const fs = require('fs');
module.exports = {
    download: function (req, res, next) {
        let fileUrl = req.query.fileUrl;
        let fileName = req.query.fileName || 'channel-app';
        let redirecUrl = req.query.redirecUrl;
        if (!!fileUrl) {
            fs.stat(fileUrl, function (err, stat) {
                if (err === null) {
                    res.download(fileUrl, fileName);
                } else {
                    req.flash('Dialog', {
                        title: '错误',
                        content: '不存在此文件'
                    });
                    res.redirect(redirecUrl);
                }
            });
        } else {
            req.flash('Dialog', {
                title: '错误',
                content: '文件路径不能为空'
            });
            res.redirect(redirecUrl);
        }
    }
}