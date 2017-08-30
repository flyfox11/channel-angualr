
angular.module('subApp.services')
    .factory('subAppResource', function ($resource, ApiConfig, $q) {

        var API_HOST = ApiConfig.API_HOST;


        /**
         * =======================================================
         *          全部搜索
         * ======================================================
         */
        var SearchAll = $resource(API_HOST + '/searchall',
            {
                keyword: '@keyword',
            });

        /**
         * =======================================================
         *          修改我的股票池
         * ======================================================
         */
        var UpdateSaved = $resource(API_HOST + '/usersaved/users',
            {
                //"key": "china_machinery","objectType": "ticker", "content": "600031.SH,600032.SH"
            },
            {
                "update": {method: 'PUT'}
            });

        /**
         * =======================================================
         *          取消收藏
         * ======================================================
         */
        var DeleteFavors = $resource(API_HOST + '/userfavors/users',
            {
                objecttype: '@objecttype',
                favorid: '@favorid'
            },
            {
                "delete": {method: 'DELETE'}
            });





        /**
         * =======================================================
         *          本系统使用的接口
         * ======================================================
         */
        //获取客户基本情况大接口
        var GetCustomerInfo = $resource(API_HOST + '/company/doGetCompanyMessage.service',
            {
            });

        //融资产品
        var GetProduct = $resource(API_HOST + '/apply/doGetApplyList.service',
            {
            });
        var GetProductById = $resource(API_HOST + '/apply/doGetApplyById.service',
            {
            });
        var AddProduct = $resource(API_HOST + '/apply/doAddApply.service',
            {
            });
        var UpdateProduct = $resource(API_HOST + '/apply/doUpdateApplyService.service',
            {
            });
        var DeleteProduct = $resource(API_HOST + '/apply/doRemoveApply.service',
            {
            });
        //企业概况
        var GetCompanyProfile = $resource(API_HOST + '/company/doGetCompanyList.service',
            {
            });
        var GetCompanyProfileById = $resource(API_HOST + '/company/doGetCompanyById.service',
            {
            });
        var AddCompanyProfile = $resource(API_HOST + '/company/doAddCompany.service',
            {
            });
        var UpdateCompanyProfile = $resource(API_HOST + '/company/doUpdateCompany.service',
            {
            });
        var DeleteCompanyProfile = $resource(API_HOST + '/company/doRemoveCompany.service',
            {
            });
        //主要经营者
        var GetMainManager = $resource(API_HOST + '/controler/doGetControlerList.service',
            {
            });
        var GetMainManagerById = $resource(API_HOST + '/controler/doGetControlerById.service',
            {
            });
        var AddMainManager = $resource(API_HOST + '/controler/doAddControler.service',
            {
            });
        var UpdateMainManager = $resource(API_HOST + '/controler/doUpdateControlerService.service',
            {
            });
        var DeleteMainManager = $resource(API_HOST + '/controler/doRemoveControler.service',
            {
            });
        //客户结构收款方式
        var GetStructurePayment = $resource(API_HOST + '/product/doGetProductList.service',
            {
            });
        var GetStructurePaymentById = $resource(API_HOST + '/product/doGetProductById.service',
            {
            });
        var AddStructurePayment = $resource(API_HOST + '/product/doAddProduct.service',
            {
            });
        var UpdateStructurePayment = $resource(API_HOST + '/product/doUpdateProductService.service',
            {
            });
        var DeleteStructurePayment = $resource(API_HOST + '/product/doRemoveProduct.service',
            {
            });
        //从业经历
        var GetBrief = $resource(API_HOST + '/controler/doGetControlerBriefList.service',
            {
            });
        var GetBriefById = $resource(API_HOST + '/brief/doGetBriefById.service',
            {
            });
        var AddBrief = $resource(API_HOST + '/brief/doAddBrief.service',
            {
            });
        var UpdateBrief = $resource(API_HOST + '/brief/doUpdateBriefService.service',
            {
            });
        var DeleteBrief = $resource(API_HOST + '/brief/doRemoveBrief.service',
            {
            });

        //企业股权结构
        var GetOwnershipStructure = $resource(API_HOST + '/company/doGetCompanyMessage.service',
            {
            });
        var GetOwnershipStructureById = $resource(API_HOST + '/ownershipStructure/doGetOwnershipStructureById.service',
            {
            });
        var AddOwnershipStructure = $resource(API_HOST + '/ownershipStructure/doAddOwnershipStructure.service',
            {
            });
        var UpdateOwnershipStructure = $resource(API_HOST + '/ownershipStructure/doUpdateOwnershipStructureService.service',
            {
            });
        var DeleteOwnershipStructure = $resource(API_HOST + '/ownershipStructure/doRemoveOwnershipStructure.service',
            {
            });

        //财务因素  资产负债表
        var GetBalance = $resource(API_HOST + '/balance/doGetBalanceById.service',
            {
            });

        var GetBalanceById = $resource(API_HOST + '/balance/doGetBalanceByYear.service',
            {
            });
        var AddBalance = $resource(API_HOST + '/balance/doAddBalance.service',
            {
            });
        var UpdateBalance = $resource(API_HOST + '/balance/doUpdateBalanceService.service',
            {
            });
        var DeleteBalance = $resource(API_HOST + '/balance/doRemoveBalance.service',
            {
            });
        return {

            SearchAll:SearchAll,
            UpdateSaved: UpdateSaved,
            DeleteFavors: DeleteFavors,


            GetCustomerInfo:GetCustomerInfo,//获取客户基本情况大接口

            GetProduct:GetProduct,//获取融资产品信息
            GetProductById:GetProductById,//查询单个融资产品
            AddProduct:AddProduct,//新增融资产品信息
            UpdateProduct:UpdateProduct,//修改融资产品信息
            DeleteProduct:DeleteProduct,//删除融资产品信息

            GetCompanyProfile:GetCompanyProfile,//获取企业概况信息
            GetCompanyProfileById:GetCompanyProfileById,//查询单个企业概况
            AddCompanyProfile:AddCompanyProfile,//新增企业概况信息
            UpdateCompanyProfile:UpdateCompanyProfile,//修改企业概况信息
            DeleteCompanyProfile:DeleteCompanyProfile,//删除企业概况信息

            GetMainManager:GetMainManager,//获取主要经营者信息
            GetMainManagerById:GetMainManagerById,//查询单个经营者信息
            AddMainManager:AddMainManager,//新增经营者信息信息
            UpdateMainManager:UpdateMainManager,//修改经营者信息信息
            DeleteMainManager:DeleteMainManager,//删除经营者信息信息

            GetStructurePayment:GetStructurePayment,//获取客户结构收款方式信息
            GetStructurePaymentById:GetStructurePaymentById,//获取单个客户结构收款方式信息
            AddStructurePayment:AddStructurePayment,//新增客户结构收款方式信息
            UpdateStructurePayment:UpdateStructurePayment,//修改客户结构收款方式信息
            DeleteStructurePayment:DeleteStructurePayment,//删除客户结构收款方式信息

            GetBrief:GetBrief,//获取从业经历信息
            GetBriefById:GetBriefById,//获取单个从业经历信息
            AddBrief:AddBrief,//新增从业经历信息
            UpdateBrief:UpdateBrief,//修改从业经历信息
            DeleteBrief:DeleteBrief,//删除从业经历信息

            GetOwnershipStructure:GetOwnershipStructure,//获取企业股权结构信息
            GetOwnershipStructureById:GetOwnershipStructureById,//获取单个企业股权结构信息
            AddOwnershipStructure:AddOwnershipStructure,//新增企业股权结构信息
            UpdateOwnershipStructure:UpdateOwnershipStructure,//修改企业股权结构信息
            DeleteOwnershipStructure:DeleteOwnershipStructure,//删除企业股权结构信息

            GetBalance:GetBalance,//获取资产 负债信息
            GetBalanceById:GetBalanceById,//获取单个资产 负债信息
            AddBalance:AddBalance,//新增资产 负债信息
            UpdateBalance:UpdateBalance,//修改资产 负债信息
            DeleteBalance:DeleteBalance,//删除资产 负债信息
        };
    })
    .factory('subAppCheck', function () {
        var checkObjEmpty=function(obj,keyNum){
            if(Object.keys(obj).length<keyNum){
                jDialog.alert('请将信息填写完整！！');
                return false;
            }
            var flag=true;
            Object.values(obj).map(function (value) {
                if(!value){
                    flag=false;
                }
            });
            if(!flag){
                jDialog.alert('请将信息填写完整！！');
            }
            return flag;
        }
        return {
            checkObjEmpty:checkObjEmpty
        }
    });
