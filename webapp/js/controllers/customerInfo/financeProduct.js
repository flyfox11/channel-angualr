
angular.module("subApp")
    .controller('FinanceProductController', function ($scope,
                                             $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.data.cusViewFlag=0;//视图标识--0：融资产品列表页1：融资产品编辑页
        $scope.data.actionFlag='add';//操作标识--新增'add',修改'update'
        $scope.data.product={//融资产品对象

        }
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10
        }
        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        $timeout(function () {
            $scope.data.Infos=$scope.initData.data.list||[];
            $scope.data.current_page = $scope.initData.data.pageNum;                //当前页
            $scope.data.total_items = $scope.initData.data.total;                // 总数量
            $scope.data.total_pages = $scope.initData.data.pages;                // 总页码
        }, 0, true);

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
            $scope.data.product={};//重新置空
            $scope.data.cusViewFlag=1;
            $scope.data.actionFlag='add';
        }

        //点击删除按钮
        $scope.action.deleteRow=function () {
            if($scope.data.selectedRowIndex>=0){

                //调用删除融资产品接口
                subAppResource.DeleteProduct.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getCusData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }

        //点击更新按钮
        $scope.action.updateRow=function () {
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetProductById.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id
                }).$promise.then(function (indata) {
                    $scope.data.product=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.cusViewFlag=1;
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
                subAppResource.AddProduct.get($scope.data.product).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.cusViewFlag=0;
                    //重新获取数据
                    getCusData();
                 }, function (reject) {
                    console.log('错误信息:',reject);
                 });
            }else if(actionFlag=='update'){
                subAppResource.UpdateProduct.get($scope.data.product).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.cusViewFlag=0;
                    //重新获取数据
                    getCusData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }
        }

        //翻页
        $scope.action.getDataByPage = function () {
            $scope.data.params.pageNum = $scope.data.current_page;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
            getCusData();
        };
        //返回
        $scope.action.back=function(){
            $scope.data.cusViewFlag=0;
        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getCusData(){
            //调用查询融资产品信息接口
            subAppResource.GetProduct.get($scope.data.params).$promise.then(function (indata) {
                $scope.data.current_page = indata.data.pageNum;                //当前页
                $scope.data.total_items = indata.data.total;                // 总数量
                $scope.data.total_pages = indata.data.pages;                // 总页码
                $scope.data.Infos=indata.data.list||[];
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

    });