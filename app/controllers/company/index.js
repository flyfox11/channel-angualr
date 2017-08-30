/**
 * Created by home on 2017/5/17.
 */
var netService = require('../../service/netService');
var path = require('path');
/*企业信息*/

module.exports = {
    company: function (req, res, next) {
        console.log('进入企业管理');
        next();
    },
    init: function (req, res, next) {
        let url = '/projectToChannel/proJectInfoListf.service';
        netService.doGet(url, {channel_id: req.session.user.channel_id}, '数据管理', res).then(function (data) {
            res.render('company/init', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                data: data.data
            });
        }).catch(function (err) {
            res.render('company/init', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                Dialog: err
            });

        });
    },
    initPost: function (req, res, next) {
        let url = '/channelCustomerExcel/customerFromExcel.service';
        let data_param = {
            filePath: req.file.path,
            fileName: req.file.originalname,
            pid: req.session.user.channel_id,
            userName: req.session.user.cname
        };
        netService.doPost(url, data_param, '数据管理文件上传', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog',{
                    title:'成功',
                    content:'上传文件成功'
                });
                let success = data.data.success;
                res.redirect('/company/datafileresult?successNum=' + success);
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: data.msg
                });
                res.redirect('/company/datafileresult');
            }
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/datafileresult');
        });
    },
    companyInfoQuery: function (req, res, next) {//企业授信额度查询
        let url = '/quotaToChannel/quotaInfoList.service';
        let param = {
            credit_code: req.query.credit_code || '',//组织机构号
            cst_full_name: req.query.cst_full_name || '',//全称
            projectNo: req.query.projectNo || '',//项目编号
            pid: req.session.user.channel_id,
            currentPage: req.query.current || 1,
            pageSize: 10
        };
        netService.doPost(url, param, '企业授信额度查询', res).then(function (data) {
            let pageList = {
                pages: data.data.pages,
                current: data.data.pageNum,
                total: data.data.total,
                url: '/company/companyInfoQuery',
                tab: '&cst_full_name=' + param.cst_full_name + '&credit_code=' + param.credit_code
            };
            res.render('company/companyInfoQuery', {
                title: '信息查询',
                showTob: {title: '企业额度查询'},
                data: data.data,
                param: param,
                pageList: pageList
            });
        }).catch(function (err) {
            res.render('company/companyInfoQuery', {
                title: '信息查询',
                showTob: {title: '企业额度查询'},
                param: param,
                Dialog: err
            });
        });

    },
    projectQuery: function (req, res, next) {//项目额度查询
        let url = '/projectToChannel/projectInfoByPid.service';
        let param = {
            projectName: req.query.projectName || '',//项目名称
            projectNo: req.query.projectNo || '',//项目编号
            channelNo: req.session.user.channel_id,//渠道
            currentPage: req.query.current || 1,
            pageSize: 10
        };
        netService.doPost(url, param, '项目额度查询', res).then(function (data) {
            let pageList = {
                pages: data.data.pages,
                current: data.data.pageNum,
                total: data.data.total,
                url: '/company/projectQuery',
                tab: '&projectNo=' + param.projectNo + '&projectName' + param.projectName
            };
            res.render('company/projectQuery', {
                title: '信息查询',
                showTob: {title: '项目额度查询'},
                param: param,
                data: data.data,
                pageList: pageList,
                param: param
            });
        }).catch(function (err) {
            res.render('company/projectQuery', {
                title: '信息查询',
                showTob: {title: '项目额度查询'},
                param: param,
                Dialog: err,
                param: param
            });
        });
    },
    order: function (req, res, next) {
        //let url = '/orderImport/getorderLogInfo.service';
        let url = '/orderImport/getFailLogInfo.service'
        let success_Number = !!req.query.success_Number ? req.query.success_Number : 0;
        let data_param = {
            current: req.query.current || 1,
            pageSize: req.query.pageSize || 10,
            userName: req.session.user.cname,
            data_type: 0
        };
        netService.doGet(url, data_param, '订单记录查询', res).then(function (data) {
            res.render('company/order', {
                title: '数据管理',
                showTob: {title: '订单管理'},
                success_Number: success_Number,
                data: data.list
            });
        }).catch(function (err) {
            res.render('company/order', {
                title: '数据管理',
                showTob: {title: '订单管理'},
                success_Number: success_Number,
                Dialog: err
            });
        });
    },
    uploadOrder: function (req, res, next) {
        let url = '/orderImport/importExcel.service';
        let data_param = {
            file_path: req.file.path,
            file_name: req.file.filename,
            userName: req.session.user.cname
        };
        netService.doPost(url, data_param, '订单上传', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: data.msg
                });
                res.redirect('/company/order?success_Number=' + data.data.count);
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: data.msg
                });
                res.redirect('/company/order');
            }
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/order');
        });
    },
    loan: function (req, res, next) {
        let url = '/quotaToChannel/quotaInfoList.service';
        let urlSelect = '/projectToChannel/proJectInfoListf.service';
        let param = {
            credit_code: req.query.credit_code || '',//组织机构号
            cst_full_name: req.query.cst_full_name || '',//全称
            projectNo: req.query.projectNo || '',//项目编号
            pid: req.session.user.channel_id,
            currentPage: req.query.current || 1,
            pageSize: 10
        };
        Promise.all([netService.doPost(urlSelect, {channel_id: req.session.user.channel_id}, '合作项目', res), netService.doGet(url, param, '贷款管理', res)]).then(function (data) {
            let pageList = {
                pages: data[1].data.pages,
                current: data[1].data.pageNum,
                total: data[1].data.total,
                url: '/company/loan',
                tab: '&projectNo=' + param.projectNo + '&credit_code=' + param.credit_code + '&cst_full_name=' + param.cst_full_name
            };
            res.render('company/loan', {
                title: '贷款管理',
                showTob: {title: '贷款管理'},
                data: data[1].data,
                pageList: pageList,
                param: param,
                dataSelect: data[0].data || {}
            });
        }).catch(function (err) {
            console.log(err);
            res.render('company/loan', {
                title: '贷款管理',
                showTob: {title: '贷款管理'},
                Dialog: err,
                param: param
            });
        });
    },
    initLoan: function (req, res, next) {//发起贷款申请
        let url = '/loanApplicationStart/selfserviceLoanFormInfo.service';
        netService.doGet(url, req.query, '发起贷款申请', res).then(function (data) {
            res.render('company/initLoan', {
                title: '企业管理',
                showTob: {title: '贷款管理'},
                data: data
            });
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/loan')
        });

    },
    //发起贷款
    initLoanPost: function (req, res, next) {
        let contract = req.files.contractfile;
        let contractfile = !!contract ? contract[0].filename : '';
        let contractfilePath = !!contract ? contract[0].path : '';

        let order = req.files.orderfile;
        let orderfile = !!order ? order[0].filename : '';
        let orderfilePath = !!order ? order[0].path : '';

        req.body.file_name = contractfile;
        req.body.file_path = contractfilePath;
        req.body.order_file_name = orderfile;
        req.body.order_file_path = orderfilePath;
        req.body.user_name = req.session.user.cname;

        let path = '/loanApplicationStart/doAdd.service';
        netService.doPost(path, req.body, '发起贷款申请', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: data.msg
                });
            } else {
                req.flash('Dialog', {
                    title: '异常',
                    content: data.msg
                });
            }
            res.redirect('/company/loan');
        }).catch(function (err) {
            req.flash('Dialog', err)
            res.redirect('/company/loan');
        });
    },
    toSeeLoan: function (req, res, next) {//查看贷款历史
        req.query.current = req.query.current || 1
        let url = '/loanOverdue/LoanHisInfo.service';
        netService.doGet(url, req.query, '查看贷款历史', res).then(function (data) {
            let pageList = {
                pages: data.pages,
                current: data.pageNum,
                total: data.total,
                url: 'company/toseeloan'
            };
            res.render('company/loanHistory', {
                title: '贷款管理',
                showTob: {title: '贷款管理'},
                data: data.list,
                pageList: pageList
            });
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/loan');
        });
    },
    //界面更新后修改
    //企业额度查询
    companyQueryView: function (req, res, next) {
        res.render('company/compantQueryView', {
            title: '信息查询',
            showTob: {title: '企业额度查询'},
            user:req.session.user
        });
    },
    //项目额度查询
    projectQueryView: function (req, res, next) {
        res.render('company/projectQueryView', {
            title: '信息查询',
            showTob: {title: '项目额度查询'}
        });
    },
    //贷款搜索
    loanQueryView: function (req, res, next) {
        let url = '/projectToChannel/proJectInfoListf.service';
        netService.doPost(url, {channel_id: req.session.user.channel_id}, '合作项目', res).then(function (data) {
            res.render('company/loanQueryView', {
                title: '贷款管理',
                data: data.data || {}
            });
        }).catch(function (err) {
            console.log(err);
            res.render('company/loanQueryView', {
                title: '贷款管理',
                Dialog: err
            });
        });

    },
    //订单搜索
    orderQueryView: function (req, res, next) {
        res.render('company/orderQueryView', {
            title: '数据管理',
            showTob: {title: '订单管理'}
        });
    },
    //订单搜索展示
    orderQuery: function (req, res, next) {
        let url = '/order/getOrderInfo.service';
        let param = {
            channel_no: req.session.user.channel_id,
            current: req.query.current || 1,
            order_no: req.query.order_no || '',
            credit_code: req.query.credit_code || '',
            cst_full_name: req.query.cst_full_name || ''
        };
        netService.doPost(url, param, '订单查询', res).then(function (data) {
            let pageList = {
                pages: data.pages,
                current: data.pageNum,
                total: data.total,
                url: '/company/orderQuery',
                tab: '&order_no=' + param.order_no + '&credit_code=' + param.credit_code + '&cst_full_name=' + param.cst_full_name
            };
            res.render('company/orderQuery', {
                title: '数据管理',
                showTob: {title: '订单管理'},
                param: param,
                data: data.list,
                pageList: pageList
            });
        }).catch(function (err) {
            res.render('company/orderQuery', {
                title: '数据管理',
                showTob: {title: '订单管理'},
                Dialog: err,
                param: param
            });
        });
    },
    //企业数据搜索界面
    companyDataQueryView: function (req, res, next) {
        res.render('company/dataManageQueryView', {
            title: '数据管理',
            showTob: {title: '企业数据'}
        });
    },
    //企业数据结果呈现
    dataManageList: function (req, res, next) {
        let url = '/customerBase/listCustomerBaseInfo.service';
        var param = {
            currentPage: req.query.current || 1,
            pageSize: req.query.pageSize || 10,
            credit_code: req.query.credit_code || '',
            channel: req.session.user.channel_id,
            cst_full_name: req.query.cst_full_name || ''
        };
        netService.doPost(url, param, '查询企业数据', res).then(function (data) {
            let pageList = {
                pages: data.pageInfo.pages,
                current: data.pageInfo.pageNum,
                total: data.pageInfo.total,
                url: '/company/dataManageList',
                tab: '&credit_code=' + param.credit_code + '&cst_full_name=' + param.cst_full_name
            };
            res.render('company/dataManageList', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                data: data.pageInfo,
                pageList: pageList,
                param: param
            });
        }).catch(function (err) {
            console.log(err);
            res.render('company/dataManageList', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                Dialog: err,
                param: param
            });
        });
    },
    //测试文件上传
    fileupload: function (req, res, next) {
        res.render('file/index', {
            title: '文件上传'
        });
    },
    fileuploadPost: function (req, res, next) {
        console.log(req.body);
        let filePath = req.file.path;
        let fileName = req.file.originalname;
        res.status(200).json({
            fileName: fileName,
            filePath: filePath
        });
    },
    //企业资料上传
    companyZiliaoUpload: function (req, res, next) {
        let url = '/companyCreditDoc/loadDataList.service';
        let param = {
            company_id: req.query.company_id,
            currentPage: 1,
            pageSize: 10
        };
        netService.doGet(url, param, '上传资料', res).then(function (data) {
            res.render('company/companyZiliaoUpload', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                list: data.data.rows,
                param: param
            });
        }).catch(function (err) {
            res.render('company/companyZiliaoUpload', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                Dialog: err,
                param: param
            });
        });

    },
    companyZiliaoUploadPost: function (req, res, next) {
        var url = '/companyCreditDoc/uploadFile.service';
        let post_data = {
            doc_link: req.file.path,
            doc_name: req.file.originalname,
            doc_type: req.query.doc_type,
            upload_user: req.session.user.userName,
            apply_id: 0,
            company_id: req.body.company_id
        };
        netService.doPost(url, post_data, '文件上传', res).then(function (result) {
            if (result.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: result.msg
                });
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: result.msg
                });
            }
            res.redirect('/company/companyZiliaoUpload');
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/companyZiliaoUpload');
        })
    },
    //删除企业资料
    delcompanyZiliao: function (req, res, next) {
        let id = req.query.id;
        let url = '/companyCreditDoc/deleteByDocid.service';
        netService.doPost(url, {doc_id: id}, '删除企业资料', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: data.msg
                });
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: data.msg
                });
            }
            res.redirect('/company/companyZiliaoUpload')
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/company/companyZiliaoUpload')
        });
    },
    datafileresult: function (req, res, next) {
        let url = '/orderImport/getFailLogInfo.service';
        let successNum = req.query.successNum;
        let param = {
            current: req.query.current || 1,
            userName: req.session.user.cname,
            data_type: 1
        };
        netService.doPost(url, param, '查看数据管理企业数据上传结果', res).then(function (data) {
            res.render('company/dataFileResult', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                data: data.list,
                successNum: successNum
            });
        }).catch(function (err) {
            console.log(err);
            res.render('company/dataFileResult', {
                title: '数据管理',
                showTob: {title: '企业数据'},
                successNum: successNum,
                Dialog: err
            });
        });
    }
}
