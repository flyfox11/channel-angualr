/**
 * 映射文件
 * 将请求路由到controllers的对象和方法上
 */
var controllers = require('../app/controllers')

module.exports = function (app) {
    app.get('/companyInfo', controllers.companyInfo.init);                   //获取客户基本情况初始数据
    app.get('/nonFinancialFactors', controllers.nonFinancialFactors.init);   //获取非财务因素分析初始数据
    app.get('/financialFactors', controllers.financialFactors.init);         //获取财务因素分析初始数据
    app.get('/guarantorAnalysis', controllers.guarantorAnalysis.init);       //获取保证人分析初始数据
    app.get('/businessModel', controllers.businessModel.init);               //获取经营模式与策略初始数据
    app.get('/comprehensiveOpinion', controllers.comprehensiveOpinion.init);//获取综合意见初始数据


    //新变化
    app.get('/report', controllers.report.init);                   //获取尽调查询页面
    app.get('/reportQuery',controllers.report.query);             //根据企业查询尽调报告
    app.get('/reportDetail',controllers.report.detail);               //企业尽调报告详细
    app.get('/reportAdd',controllers.report.add);               //企业尽调报告 添加

    app.get('/channelAnalysis', controllers.channelAnalysis.init);                   //获取尽调查询页面

};
