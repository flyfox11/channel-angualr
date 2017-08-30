/**
 * Created by 胡志甫 on 2017/7/10.
 */

angular.module("subApp")
    .controller('CustomerInfoAddController', function ($scope,
                                                      $timeout,subAppResource,subAppCheck) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.data.company_id='';
        $scope.data.person_id='';
        $scope.data.params={
            company_id:''
        }
        //融资产品
        $scope.data.apply={
        }
        $scope.data.addApply={
        }

        // $scope.data.isApplyEdit=true;
        $scope.data.isApplyFinish=false;
        //企业概况
        $scope.data.company={
        }
        $scope.data.addCompany={
        }
        // $scope.data.isCompanyEdit=true;
        $scope.data.isCompanyFinish=false;

        //实际控制人
        $scope.data.manager={
        }
        $scope.data.addManager={
        }
        // $scope.data.isManagerEdit=true;
        $scope.data.isManagerFinish=false;
        //从业经历
        $scope.data.brief={
        }
        $scope.data.addBrief={
        }
        $scope.data.isBriefFinish=false;
        $scope.data.isBriefAdd=true;
        //股权结构
        $scope.data.ownership={
        }
        $scope.data.addOwnerShip={
        }
        $scope.data.isOwnerShipFinish=false;
        $scope.data.isOwnerShipAdd=true;
        $scope.data.sexNames=['男','女'];
        $scope.data.natureNames=['股份公司','有限责任公司','合伙','中外合资','外商独资','上市公司','其他'];
        $scope.data.housingPropertiesNames=['自有','租赁','其他'];
        /** ==========================================
         *          数据
         * ===========================================*/



        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/
        $scope.action.addRow1=function () {
            $scope.data.ownership={};//重新置空
            $scope.data.isOwnerShipAdd=false;
        }
        $scope.action.addRow2=function () {
            $scope.data.brief={};//重新置空
            $scope.data.isBriefAdd=false;
        }
        $scope.action.saveRow1=function () {
            if(!$scope.data.company_id){
                jDialog.alert('企业概况完成后才能添加！！');
                return;
            }
            $scope.data.isOwnerShipAdd=true;
            $scope.data.ownership.company_id=$scope.data.company_id;
            $scope.data.ownership.channel_id=$scope.data.company_id;
            subAppResource.AddOwnershipStructure.get($scope.data.ownership).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.saveRow2=function () {
            if(!$scope.data.person_id){
                jDialog.alert('实际控制人完成后才能添加！！');
                return;
            }
            $scope.data.isBriefAdd=true;
            $scope.data.brief.company_id=$scope.data.company_id;
            $scope.data.brief.person_id=$scope.data.person_id;
            subAppResource.AddBrief.get($scope.data.brief).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getData();
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.cancelRow1=function(){
            $scope.data.isOwnerShipAdd=true;
        }
        $scope.action.cancelRow2=function(){
            $scope.data.isBriefAdd=true;
        }


        //点击完成按钮
        $scope.action.saveApply=function (index) {

            subAppResource.AddProduct.get($scope.data.addApply).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //获取新增apply的company_id
                $scope.data.company_id=indata.data.company_id;
                $scope.data.isApplyFinish=true;
                $scope.data.apply=$scope.data.addApply;
            }, function (reject) {
                console.log('错误信息:',reject);
            });

        }

        $scope.action.saveManager=function (index) {
            if(!$scope.data.company_id){
                jDialog.alert('融资产品完成后才能添加！！');
                return;
            }
            $scope.data.addManager.company_id=$scope.data.company_id;
            subAppResource.AddMainManager.get($scope.data.addManager).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //获取新增manager的person_id
                $scope.data.person_id=indata.data.person_id;
                $scope.data.isManagerFinish=true;
                $scope.data.manager=$scope.data.addManager;
            }, function (reject) {
                console.log('错误信息:',reject);
            });

        }
        $scope.action.saveCompany=function (index) {
            if(!$scope.data.company_id){
             jDialog.alert('融资产品完成后才能添加！！');
             return;
             }
            if(subAppCheck.checkObjEmpty($scope.data.addCompany,16)){
                $scope.data.addCompany.company_id=$scope.data.company_id;
                subAppResource.AddCompanyProfile.get($scope.data.addCompany).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.isCompanyFinish=true;
                    $scope.data.company=$scope.data.addCompany;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }
        }
        $scope.action.saveBrief=function (index) {
            if(!$scope.data.person_id){
                jDialog.alert('实际控制人完成后才能添加！！');
                return;
            }
            $scope.data.addBrief.company_id=$scope.data.company_id;
             $scope.data.addBrief.person_id=$scope.data.person_id
            subAppResource.AddBrief.get($scope.data.addBrief).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                $scope.data.isBriefFinish=true;
                $scope.data.brief=$scope.data.addBrief;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        $scope.action.saveOwnerShip=function (index) {
            if(!$scope.data.company_id){
                jDialog.alert('企业概况完成后才能添加！！');
                return;
            }
            $scope.data.addOwnerShip.company_id=$scope.data.company_id;
            $scope.data.addOwnerShip.channel_id=$scope.data.company_id;
            subAppResource.AddOwnershipStructure.get($scope.data.addOwnerShip).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                $scope.data.isOwnerShipFinish=true;
                $scope.data.ownership=$scope.data.addOwnerShip;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }


        //重写
        $scope.action.cancelApply=function(){
            $scope.data.addApply={
            }
        }
        $scope.action.cancelManager=function () {
            $scope.data.addManager={
            }
        }
        $scope.action.cancelCompany=function () {
            $scope.data.addCompany={
            }
        }
        $scope.action.cancelBrief=function () {
            $scope.data.addBrief={
            }
        }
        $scope.action.cancelOwnerShip=function () {
            $scope.data.addOwnerShip={
            }
        }
        $scope.action.getAge=function () {
            if($scope.data.addManager.idcard.length==18){
                $scope.data.addManager.age=new Date().getFullYear()-$scope.data.addManager.idcard.substr(6,4);
            }else {
                jDialog.alert('身份证格式不正确');
            }

        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        /*function getApplyData(){

            subAppResource.GetProduct.get().$promise.then(function (indata) {
                $scope.data.company_id=indata.data.list[indata.data.list.length-1].company_id;

            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }*/
        function getData(){
            subAppResource.GetCustomerInfo.get({company_id:$scope.data.company_id}).$promise.then(function (indata) {
                $scope.data.apply=indata.data.apply||{};
                $scope.data.ownershipList=indata.data.ownershipList||[];
                $scope.data.briefList=indata.data.controlerList[0].list||[];
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
    });