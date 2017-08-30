/**
 * Created by 胡志甫 on 2017/7/10.
 */

angular.module("subApp")
    .controller('ReportListController', function ($scope,
                                                $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10,
            company_name:$scope.data.company_name
        }


        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        $timeout(function () {
            // 获取数据 - 来自路由
            $timeout(function () {
                $scope.data.Infos=$scope.initData.data.list||[];
                $scope.data.current_page = $scope.initData.data.pageNum;                //当前页
                $scope.data.total_items = $scope.initData.data.total;                // 总数量
                $scope.data.total_pages = $scope.initData.data.pages;                // 总页码
            }, 0, true);
        }, 0, true);


        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/
        //翻页
        $scope.action.getDataByPage = function () {
            $scope.data.params.pageNum = $scope.data.current_page;
            getCusData();
        };


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