/**
 * Created by 胡志甫 on 2017/7/10.
 */

angular.module("subApp")
    .controller('CustomerInfoController', function ($scope,
                                                      $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.data.params={
            company_id:''
        }
        //融资产品
        // $scope.data.isProductAdd=true;
        $scope.data.apply={
        }
        $scope.data.isApplyEdit=true;
        /*$scope.data.selectedRowIndex=-1;*/
        //企业概况
        $scope.data.company={
        }
        $scope.data.isCompanyEdit=true;
        //股权结构
        $scope.data.selectedRowIndex1=-1;
        $scope.data.ownership={
        }
        $scope.data.isOwnerShipAdd=true;

        //从业经历
        $scope.data.selectedRowIndex2=-1;
        $scope.data.brief={
        }
        $scope.data.isBriefAdd=true;

        //实际控制人
        $scope.data.manager={
        }
        $scope.data.isManagerEdit=true;
        $scope.data.sexNames=['男','女'];
        $scope.data.natureNames=['股份公司','有限责任公司','合伙','中外合资','外商独资','上市公司','其他'];
        $scope.data.housingPropertiesNames=['自有','租赁','其他'];
        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        $timeout(function () {
            $scope.data.apply=$scope.initData.data.apply;
            $scope.data.company=$scope.initData.data.company||{};
            $scope.data.ownershipList =$scope.initData.data.ownershipList||[];
            if($scope.initData.data.controlerList.length==0){
                $scope.data.manager=$scope.initData.data.manager||{};
                $scope.data.briefList=$scope.initData.data.briefList||[];
            }else{
                $scope.data.manager=$scope.initData.data.controlerList[0]||{};
                $scope.data.briefList=$scope.initData.data.controlerList[0].list||[];
            }


            $scope.data.params.company_id=$scope.initData.company_id;
        }, 0, true);

        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/



        //点击新增按钮
        $scope.action.addRow=function () {
            $scope.data.apply={};//重新置空
            $scope.data.isProductAdd=false;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引

        }
        $scope.action.addRow1=function () {
            $scope.data.ownership={};//重新置空
            $scope.data.isOwnerShipAdd=false;
            $scope.data.selectedRowIndex1=-1; //重置tr选中索引
        }
        $scope.action.addRow2=function () {
            $scope.data.brief={};//重新置空
            $scope.data.isBriefAdd=false;
            $scope.data.selectedRowIndex2=-1; //重置tr选中索引
        }
        //点击编辑按钮
        $scope.action.editApply=function (index) {
            $scope.data.editApply=angular.copy($scope.data.apply);
            $scope.data.isApplyEdit=false;
        }
        $scope.action.editRow1=function (index) {
            $scope.data.isOwnerShipAdd=true;
            $scope.data.selectedRowIndex1=index;
            $scope.data.editOwnership=angular.copy($scope.data.ownershipList[index]);
        }
        $scope.action.editRow2=function (index) {
            $scope.data.isBriefAdd=true;
            $scope.data.selectedRowIndex2=index;
            $scope.data.editBrief=angular.copy($scope.data.briefList[index]);
        }
        $scope.action.editManager=function (index) {
            $scope.data.editManager=angular.copy($scope.data.manager);
            $scope.data.isManagerEdit=false;
        }
        $scope.action.editCompany=function (index) {
            $scope.data.editCompany=angular.copy($scope.data.company);
            $scope.data.isCompanyEdit=false;
        }
        //点击修改按钮
        $scope.action.updateApply=function () {

            subAppResource.UpdateProduct.get($scope.data.editApply).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
                $scope.data.isApplyEdit=true;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.updateRow1=function () {
            subAppResource.UpdateOwnershipStructure.get($scope.data.editOwnership).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
                $scope.data.selectedRowIndex1=-1;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.updateRow2=function () {
            subAppResource.UpdateBrief.get($scope.data.editBrief).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
                $scope.data.selectedRowIndex2=-1;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.updateManager=function () {
            delete $scope.data.editManager.list;
            $scope.data.editManager.company_id=$scope.data.params.company_id;
            subAppResource.UpdateMainManager.get($scope.data.editManager).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
                $scope.data.isManagerEdit=true;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.updateCompany=function () {
            $scope.data.editCompany.company_id=$scope.data.params.company_id;
            subAppResource.UpdateCompanyProfile.get($scope.data.editCompany).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
                $scope.data.isCompanyEdit=true;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        //点击删除按钮
        $scope.action.deleteApply=function (applyer_id) {
            //调用删除融资产品接口
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteProduct.get({
                        applyer_id:applyer_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        //重新获取数据
                        getData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });

        }
        $scope.action.deleteRow1=function (index) {
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteOwnershipStructure.get({
                        shareholder_id:$scope.data.ownershipList[index].shareholder_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        $scope.data.selectedRowIndex1=-1; //重置tr选中索引
                        //重新获取数据
                        getData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });

        }
        $scope.action.deleteRow2=function (index) {
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteBrief.get({
                        brief_id:$scope.data.briefList[index].brief_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        $scope.data.selectedRowIndex2=-1; //重置tr选中索引
                        //重新获取数据
                        getData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });

        }
        $scope.action.deleteManager=function (person_id) {
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteMainManager.get({
                        person_id:person_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        //重新获取数据
                        getData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });

        }
        $scope.action.deleteCompany=function (company_id) {
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteCompanyProfile.get({
                        company_id:company_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        //重新获取数据
                        getData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });

        }
        //保存操作
        $scope.action.saveRow=function (actionFlag) {
            $scope.data.isProductAdd=true;

            $scope.data.apply.company_id=$scope.data.params.company_id;
            subAppResource.AddProduct.get($scope.data.apply).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.saveRow1=function (actionFlag) {
            $scope.data.isOwnerShipAdd=true;
            $scope.data.ownership.company_id=$scope.data.params.company_id;
            $scope.data.ownership.channel_id=$scope.data.params.company_id;
            subAppResource.AddOwnershipStructure.get($scope.data.ownership).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.saveRow2=function () {
            $scope.data.isBriefAdd=true;
            $scope.data.brief.company_id=$scope.data.params.company_id;
            $scope.data.brief.person_id=$scope.data.manager.person_id;
            subAppResource.AddBrief.get($scope.data.brief).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

        //返回
        $scope.action.cancelApply=function(){
            $scope.data.isApplyEdit=true;
        }
        $scope.action.cancelRow1=function(){
            $scope.data.isOwnerShipAdd=true;
            $scope.data.selectedRowIndex1=-1; //重置tr选中索引
        }
        $scope.action.cancelRow2=function(){
            $scope.data.isBriefAdd=true;
            $scope.data.selectedRowIndex2=-1; //重置tr选中索引
        }
        $scope.action.cancelManager=function (index) {
            $scope.data.isManagerEdit=true;
        }
        $scope.action.cancelCompany=function (index) {
            $scope.data.isCompanyEdit=true;
        }
        $scope.action.getAge=function () {
            if($scope.data.manager.idcard.length==18){
                $scope.data.manager.age=new Date().getFullYear()-$scope.data.manager.idcard.substr(6,4);
            }else {
                jDialog.alert('身份证格式不正确');
            }
        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getData(){
            //调用查询融资产品信息接口
            subAppResource.GetCustomerInfo.get($scope.data.params).$promise.then(function (indata) {
                $scope.data.apply=indata.data.apply||{};
                $scope.data.company=indata.data.company||{};
                $scope.data.manager=indata.data.controlerList[0]||{};
                $scope.data.ownershipList=indata.data.ownershipList||[];
                if(indata.data.controlerList[0]){
                    $scope.data.briefList=indata.data.controlerList[0].list||[];
                }
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

    });