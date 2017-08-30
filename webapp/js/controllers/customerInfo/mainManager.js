
angular.module("subApp")
    .controller('MainManagerController', function ($scope,
                                             $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.viewFlag=0;//视图标识--0：主要经营者列表页1：主要经营者编辑页 2:从业经历列表页3：从业经历编辑页
        $scope.data.actionFlag='add';//操作标识--新增'add',修改'update'
        $scope.data.manager={//主要经营者对象

        }
        $scope.data.brief={//从业经历对象

        }
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10
        }
        $scope.data.params1={   //分页相关对象
            pageNum:1,
            pageSize:10,
            person_id:''
        }
        /** ==========================================
         *          数据
         * ===========================================*/



        /** ==========================================
         *          设置
         * ===========================================*/
        $scope.$on("getMainManagerData", function(event, data) {
            getManagerData();
        });

        /** ==========================================
         *          动作
         * ===========================================*/

        $scope.action.getBriefs=function ($event,person_id) {
            $event.stopPropagation();
            $scope.data.viewFlag=2;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            $scope.data.params1.person_id=person_id;
            getBriefData();
        }
        //表格tr选择
        $scope.action.selectRow=function (index) {
            if($scope.data.selectedRowIndex==index){
                $scope.data.selectedRowIndex=-1; //重置tr选中索引
                return;
            }
            $scope.data.selectedRowIndex=index;
        }

        //点击新增按钮
        $scope.action.addRow=function (is_brief) {
            if(is_brief){
                $scope.data.viewFlag=3;
                $scope.data.brief={} //重新置空
            }else{
                $scope.data.manager={};//重新置空
                $scope.data.viewFlag=1;
            }
            $scope.data.actionFlag='add';
        }

        //点击删除按钮
        $scope.action.deleteRow=function (is_brief) {
            if(is_brief){
                deleteBrief();
                return;
            }
            if($scope.data.selectedRowIndex>=0){

                subAppResource.DeleteMainManager.get({
                    person_id:$scope.data.Infos[$scope.data.selectedRowIndex].person_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getManagerData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }

        //点击更新按钮
        $scope.action.updateRow=function (is_brief) {
            if(is_brief){
                updateBrief();
                return;
            }
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetMainManagerById.get({
                    person_id:$scope.data.Infos[$scope.data.selectedRowIndex].person_id
                }).$promise.then(function (indata) {
                    $scope.data.manager=indata.data;
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
        $scope.action.saveRow=function (actionFlag,is_brief) {
            if(is_brief){
                saveBrief(actionFlag);
                return;
            }
            if(actionFlag=='add'){
                subAppResource.AddMainManager.get($scope.data.manager).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getManagerData();
                 }, function (reject) {
                    console.log('错误信息:',reject);
                 });
            }else if(actionFlag=='update'){
                subAppResource.UpdateMainManager.get($scope.data.manager).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getManagerData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }

        }

        //翻页
        $scope.action.getDataByPage = function (is_brief) {
            if(is_brief){
                getBriefByPage();
                return;
            }
            $scope.data.params.pageNum = $scope.data.current_page;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getManagerData();
        };
        //返回
        $scope.action.back=function(is_brief){
            $scope.data.viewFlag=0;
            is_brief&&($scope.data.viewFlag=2);
        }

        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getManagerData(){
            //调用查询融资产品信息接口
            subAppResource.GetMainManager.get($scope.data.params).$promise.then(function (indata) {
                $scope.data.current_page = indata.data.pageNum||1;                //当前页
                $scope.data.total_items = indata.data.total;                // 总数量
                $scope.data.total_pages = indata.data.pages||1;                // 总页码
                $scope.data.Infos=indata.data.list||[];
                console.table($scope.data.Infos)
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        function getBriefData(){
            //从业经历
            subAppResource.GetBrief.get($scope.data.params1).$promise.then(function (indata) {
                $scope.data.current_page1 = indata.data.pageNum||1;                //当前页
                $scope.data.total_items1 = indata.data.total;                // 总数量
                $scope.data.total_pages1 = indata.data.pages||1;                // 总页码
                $scope.data.Lists=indata.data.list||[];
                console.table($scope.data.Lists)
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        //删除从业经历
        function deleteBrief(){
            if($scope.data.selectedRowIndex>=0){

                subAppResource.DeleteBrief.get({
                    brief_id:$scope.data.Lists[$scope.data.selectedRowIndex].brief_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getBriefData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }
        //更新从业经历时单条查询
        function updateBrief() {
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetBriefById.get({
                    brief_id:$scope.data.Lists[$scope.data.selectedRowIndex].brief_id
                }).$promise.then(function (indata) {
                    $scope.data.brief=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.viewFlag=3;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else{
                jDialog.alert('请选中一条记录');
            }
        }
        //保存从业经历
        function saveBrief(actionFlag) {
            if(actionFlag=='add'){
                $scope.data.brief.person_id=$scope.data.params1.person_id;//获取person_id
                console.log($scope.data.params1.person_id,':::');
                subAppResource.AddBrief.get($scope.data.brief).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=2;
                    //重新获取数据
                    getBriefData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else if(actionFlag=='update'){
                subAppResource.UpdateBrief.get($scope.data.brief).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=2;
                    //重新获取数据
                    getBriefData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }
        }
        //从业经历分页
        function getBriefByPage() {
            $scope.data.params1.pageNum = $scope.data.current_page1;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getBriefData();
        }

    });