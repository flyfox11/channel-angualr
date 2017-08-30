var controllers = require('../app/controllers');
var multer = require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        console.log(file);
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({storage: storage});
module.exports = function (app) {
    app.get('/userData/init', controllers.userData.init);//用户导入
    app.get('/userData/info', controllers.userData.info);//用户信息
    app.get('/userData/history', controllers.userData.history);//导入历史
    app.post('/userData/upload', upload.single('impFile'), controllers.userData.upload);//上传文件
};
