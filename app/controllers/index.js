/**
 * controller 模块的入口文件
 * 在此,可以将变量映射到处理文件,类似内部的路由
 * @type {{home: *, messages: *, comments: *}}
 */
module.exports = {
    login: require('./login'),
    file:require('./file'),


    companyInfo:require('./customerInfo/customerInfo'),
    nonFinancialFactors:require('./nonFinancialFactors/nonFinancialFactors'),
    financialFactors:require('./financialFactors/financialFactors'),
    guarantorAnalysis:require('./guarantorAnalysis/guarantorAnalysis'),
    businessModel:require('./businessModel/businessModel'),
    comprehensiveOpinion:require('./comprehensiveOpinion/comprehensiveOpinion'),

    //新变化
    report:require('./report'),
    channelAnalysis:require('./channelAnalysis'),
};
