
angular.module("subApp")
    .controller('StructurePaymentController', function ($scope,
                                                      $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.proViewFlag=0;//视图标识--0：客户结构收款方式列表页1：客户结构收款方式编辑页
        $scope.data.actionFlag='add';//操作标识--新增'add',修改'update'
        $scope.data.payment={//客户结构收款方式对象

        }
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10
        }
        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        /*$timeout(function () {
            $scope.data.Infos=$scope.initData.data.list||[];
            $scope.data.current_page = $scope.initData.data.pageNum;                //当前页
            $scope.data.total_items = $scope.initData.data.total;                // 总数量
            $scope.data.total_pages = $scope.initData.data.pages;                // 总页码
        }, 0, true);*/

        $scope.$on("getNonFinancialFatorsData", function(event, data) {
            getProData();
        });
        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/


        //表格tr选择
        $scope.action.selectRow=function (index,id) {
            if($scope.data.selectedRowIndex==index){
                $scope.data.selectedRowIndex=-1; //重置tr选中索引
                return;
            }
            $scope.data.selectedRowIndex=index;
        }

        //点击新增按钮
        $scope.action.addRow=function () {
            $scope.data.payment={};//重新置空
            $scope.data.proViewFlag=1;
            $scope.data.actionFlag='add';
        }

        //点击删除按钮
        $scope.action.deleteRow=function () {
            if($scope.data.selectedRowIndex>=0){
                //调用删除客户结构收款方式接口
                subAppResource.DeleteStructurePayment.get({
                    product_id:$scope.data.Infos[$scope.data.selectedRowIndex].product_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引

                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getProData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }

        //点击更新按钮
        $scope.action.updateRow=function () {
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetStructurePaymentById.get({
                    product_id:$scope.data.Infos[$scope.data.selectedRowIndex].product_id
                }).$promise.then(function (indata) {
                    $scope.data.payment=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.proViewFlag=1;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else{
                jDialog.alert('请选中一条记录');
            }
        }

        //添加或更新操作
        $scope.action.saveRow=function (actionFlag) {
            if(actionFlag=='add'){
                subAppResource.AddStructurePayment.get($scope.data.payment).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.proViewFlag=0;
                    //重新获取数据
                    getProData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else if(actionFlag=='update'){
                subAppResource.UpdateStructurePayment.get($scope.data.payment).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.proViewFlag=0;
                    //重新获取数据
                    getProData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }

        }

        //翻页
        $scope.action.getDataByPage = function () {
            $scope.data.params.pageNum = $scope.data.current_page;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getProData();
        };
        //返回
        $scope.action.back=function(){
            $scope.data.proViewFlag=0;
        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getProData(){
            //调用查询客户结构收款方式信息接口
            subAppResource.GetStructurePayment.get($scope.data.params).$promise.then(function (indata) {
                console.log(indata);
                $scope.data.current_page = indata.data.pageNum;                //当前页
                $scope.data.total_items = indata.data.total;                // 总数量
                $scope.data.total_pages = indata.data.pages;                // 总页码
                $scope.data.Infos=indata.data.list||[];
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

    });