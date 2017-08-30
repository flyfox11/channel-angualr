var controllers = require('../app/controllers')
var multer = require('multer');
var config = require('./config.js');
var storage = multer.diskStorage({
    destination: config.fileUploadPath,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, config.systemName + '-' + fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({storage: storage});

module.exports = function (app) {
    //app.get('/company/*', controllers.company.company);//企业管理
    app.get('/company/init', controllers.company.init);//数据管理
    app.post('/company/init', upload.single('file'), controllers.company.initPost);//数据管理文件上传
    app.get('/company/datafileresult', controllers.company.datafileresult);//数据管理文件上传完,结果查看
    app.get('/company/companyInfoQuery', controllers.company.companyInfoQuery);//企业授信额度查询
    app.get('/company/projectQuery', controllers.company.projectQuery);//项目额度查询
    app.get('/company/order', controllers.company.order);//订单管理
    app.post('/company/order', upload.single('file'), controllers.company.uploadOrder);//订单上传
    app.get('/company/loan', controllers.company.loan);//贷款管理
    app.get('/company/initloan', controllers.company.initLoan);//发起贷款申请
    app.post('/company/initloan', upload.fields([
        {name: 'contractfile', maxCount: 1},
        {name: 'orderfile', maxCount: 1}
    ]), controllers.company.initLoanPost);//发起贷款申请
    app.get('/company/toseeloan', controllers.company.toSeeLoan);//查看贷款申请进度
    //界面更新后url
    app.get('/company/companyQueryView', controllers.company.companyQueryView);//企业额度查询搜索界面
    app.get('/company/projectQueryView', controllers.company.projectQueryView);//项目额度查询搜索界面
    app.get('/company/loanQueryView', controllers.company.loanQueryView);//贷款管理搜索界面
    app.get('/company/orderQueryView', controllers.company.orderQueryView);//订单管理搜索界面
    app.get('/company/orderQuery', controllers.company.orderQuery);//订单查询
    app.get('/company/companyDataQueryView', controllers.company.companyDataQueryView);//企业数据搜索界面
    app.get('/company/dataManageList', controllers.company.dataManageList);//企业数据结果呈现
    app.get('/company/companyZiliaoUpload', controllers.company.companyZiliaoUpload);//企业资料上传
    app.post('/company/companyZiliaoUpload', upload.single('file'), controllers.company.companyZiliaoUploadPost);//企业资料上传
    app.get('/company/delcompanyZiliao', controllers.company.delcompanyZiliao);//删除企业资料
    //测试
    // app.get('/company/fileupload', controllers.company.fileupload);//测试文件上传
    //app.post('/company/fileupload',upload.single('file'), controllers.company.fileuploadPost);//测试文件上传
};
