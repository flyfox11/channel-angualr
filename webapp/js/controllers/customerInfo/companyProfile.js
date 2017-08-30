
angular.module("subApp")
    .controller('CompanyProfileController', function ($scope,
                                             $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.viewFlag=0;//视图标识--0：企业概况列表页1：企业概况编辑页
        $scope.data.actionFlag='add';//操作标识--新增'add',修改'update'
        $scope.data.company={//企业概况对象

        }
        $scope.data.ownershipStructure={//股权结构对象

        }
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10
        }
        $scope.data.params1={   //分页相关对象
            pageNum:1,
            pageSize:10,
            company_id:''
        }
        /** ==========================================
         *          数据
         * ===========================================*/



        /** ==========================================
         *          设置
         * ===========================================*/
        $scope.$on("getCompanyProfileData", function(event, data) {
            getComData();
        });

        /** ==========================================
         *          动作
         * ===========================================*/

        $scope.action.getOwnershipStructures=function ($event,channel_id) {
            $event.stopPropagation();
            $scope.data.viewFlag=2;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            $scope.data.params1.channel_id=channel_id;
            getOwnershipStructureData();
        }
        //表格tr选择
        $scope.action.selectRow=function (index,id) {
            if($scope.data.selectedRowIndex==index){
                $scope.data.selectedRowIndex=-1; //重置tr选中索引
                return;
            }
            $scope.data.selectedRowIndex=index;
        }

        //点击新增按钮
        $scope.action.addRow=function (is_structure) {
            if(is_structure){
                $scope.data.viewFlag=3;
                $scope.data.ownershipStructure={} //重新置空
            }else{
                $scope.data.company={};//重新置空
                $scope.data.viewFlag=1;
            }
            $scope.data.actionFlag='add';
        }

        //点击删除按钮
        $scope.action.deleteRow=function (is_structure) {
            if(is_structure){
                deleteOwnershipStructure();
                return;
            }
            if($scope.data.selectedRowIndex>=0){

                subAppResource.DeleteCompanyProfile.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getComData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }

        //点击更新按钮
        $scope.action.updateRow=function (is_structure) {
            if(is_structure){
                updateOwnershipStructure();
                return;
            }
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetCompanyProfileById.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id
                }).$promise.then(function (indata) {
                    $scope.data.company=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.viewFlag=1;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else{
                jDialog.alert('请选中一条记录');
            }
        }

        //添加或更新操作
        $scope.action.saveRow=function (actionFlag,is_structure) {
            if(is_structure){
                saveOwnershipStructure(actionFlag);
                return;
            }
            if(actionFlag=='add'){
                subAppResource.AddCompanyProfile.get($scope.data.company).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getComData();
                 }, function (reject) {
                    console.log('错误信息:',reject);
                 });
            }else if(actionFlag=='update'){
                subAppResource.UpdateCompanyProfile.get($scope.data.company).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getComData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }

        }

        //翻页
        $scope.action.getDataByPage = function (is_structure) {
            if(is_structure){
                getOwnershipStructureByPage();
                return;
            }
            $scope.data.params.pageNum = $scope.data.current_page;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getComData();
        };
        //返回
        $scope.action.back=function(is_structure){
            $scope.data.viewFlag=0;
            is_structure&&($scope.data.viewFlag=2);
        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getComData(){
            //调用查询融资产品信息接口
            subAppResource.GetCompanyProfile.get($scope.data.params).$promise.then(function (indata) {
                $scope.data.current_page = indata.data.pageNum||1;                //当前页
                $scope.data.total_items = indata.data.total;                // 总数量
                $scope.data.total_pages = indata.data.pages||1;                // 总页码
                $scope.data.Infos=indata.data.list||[];
                console.table($scope.data.Infos)
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

        function getOwnershipStructureData(){
            //股权结构
            subAppResource.GetOwnershipStructure.get($scope.data.params1).$promise.then(function (indata) {
                $scope.data.current_page1 = indata.data.pageNum||1;                //当前页
                $scope.data.total_items1 = indata.data.total;                // 总数量
                $scope.data.total_pages1 = indata.data.pages||1;                // 总页码
                $scope.data.Lists=indata.data.ownershipList||[];
                console.table($scope.data.ownershipList)
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        //删除股权结构
        function deleteOwnershipStructure(){
            if($scope.data.selectedRowIndex>=0){

                subAppResource.DeleteOwnershipStructure.get({
                    channel_id:$scope.data.Lists[$scope.data.selectedRowIndex].channel_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getOwnershipStructureData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }
        //更新股权结构时单条查询
        function updateOwnershipStructure() {
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetOwnershipStructureById.get({
                    channel_id:$scope.data.Lists[$scope.data.selectedRowIndex].channel_id
                }).$promise.then(function (indata) {
                    $scope.data.ownershipStructure=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.viewFlag=3;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else{
                jDialog.alert('请选中一条记录');
            }
        }
        //保存股权结构
        function saveOwnershipStructure(actionFlag) {
            if(actionFlag=='add'){
                $scope.data.ownershipStructure.channel_id=$scope.data.params1.company_id;//获取channel_id
                console.log($scope.data.params1.channel_id,':::');
                subAppResource.AddOwnershipStructure.get($scope.data.ownershipStructure).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=2;
                    //重新获取数据
                    getOwnershipStructureData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else if(actionFlag=='update'){
                subAppResource.UpdateOwnershipStructure.get($scope.data.ownershipStructure).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=2;
                    //重新获取数据
                    getOwnershipStructureData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }
        }
        //股权结构分页
        function getOwnershipStructureByPage() {
            $scope.data.params1.pageNum = $scope.data.current_page1;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getOwnershipStructureData();
        }

    });