/**
 * Created by Administrator on 2017/7/10.
 */

angular.module("subApp")
    .controller('StructurePaymentController', function ($scope,
                                                    $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.isProductAdd=true;
        $scope.data.product={//融资产品对象

        }
        $scope.data.info={//融资产品对象

        }
        $scope.data.selectedRowIndex=-1;
        $scope.data.company_id=''
        $scope.data.company_add_id=''
        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        $timeout(function () {

            $scope.data.company_id=$scope.initData.company_id;
        }, 0, true);

        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/

        $scope.$on("getNonFinancialFatorsData", function(event, data) {

            if(!$scope.data.company_id){
                $scope.data.company_add_id=$scope.$$prevSibling.data.company_id;
                $scope.data.Infos=[];
            }else{
                getProData();
            }
        });

        //点击新增按钮
        $scope.action.addRow=function () {
            $scope.data.product={};//重新置空
            $scope.data.isProductAdd=false;
        }
        //点击编辑按钮
        $scope.action.editRow=function (index) {
            $scope.data.isProductAdd=true;
            $scope.data.selectedRowIndex=index;
            $scope.data.info=angular.copy($scope.data.Infos[index]);

        }
        //点击修改按钮
        $scope.action.updateRow=function () {

            console.log($scope.data.info);
            subAppResource.UpdateStructurePayment.get($scope.data.info).$promise.then(function (indata) {
                jDialog.alert(indata.msg);
                //重新获取数据
                getProData();
                $scope.data.selectedRowIndex=-1;
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
        //点击删除按钮
        $scope.action.deleteRow=function (index) {
            jDialog.confirm('确定要删除该数据吗？',{
                handler : function(button,dialog) {
                    subAppResource.DeleteStructurePayment.get({
                        product_id:$scope.data.Infos[index].product_id
                    }).$promise.then(function (indata) {
                        jDialog.alert(indata.msg);
                        $scope.data.selectedRowIndex=-1; //重置tr选中索引
                        //重新获取数据
                        getProData();
                    }, function (reject) {
                        console.log('错误信息:',reject);
                    });
                    dialog.close();
                }
            });
        }

        //点击保存按钮
        /*$scope.action.saveRow=function () {

        }*/

        //添加操作
         $scope.action.saveRow=function () {
             $scope.data.isProductAdd=true;
             var company_id=$scope.data.company_id||$scope.data.company_add_id;
             if(!company_id){
                 jDialog.alert('融资产品完成后才能添加！！');
                 return;
             }
             $scope.data.product.company_id=company_id;
             subAppResource.AddStructurePayment.get($scope.data.product).$promise.then(function (indata) {
                 jDialog.alert(indata.msg);
                 //重新获取数据
                     getProData();
                 }, function (reject) {
                 console.log('错误信息:',reject);
                 });
         }

        //返回
        $scope.action.cancelRow=function(){
            $scope.data.isProductAdd=true;
            $scope.data.selectedRowIndex=-1; //重置tr选中索引
        }
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getProData(){
            //调用查询融资产品信息接口
            var company_id=$scope.data.company_id||$scope.data.company_add_id;
            subAppResource.GetStructurePayment.get({company_id:company_id}).$promise.then(function (indata) {
                $scope.data.Infos=indata.data.list||[];
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

    });