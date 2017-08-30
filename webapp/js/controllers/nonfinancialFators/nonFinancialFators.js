
angular.module("subApp")
    .controller('propertyController', function ($scope,
                                                $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.selectedProIndex=0;//tab索引
        $scope.data.proMenus=[{cname:'客户结构收款方式',curi:'#'},{cname:'产品产销盈利模式',curi:'#'}];//tab页信息

        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由


        /** ==========================================
         *          设置
         * ===========================================*/


        /** ==========================================
         *          动作
         * ===========================================*/
        //tab菜单选择
        $scope.action.selectProMenu=function (index) {
            $scope.data.selectedProIndex=index;
            if(index==1){
                //与子controller之间通信
                /*$scope.$broadcast('getCompanyProfileData', "获取企业概况数据");*/
            }
        }


        /** ==========================================
         *          内部函数
         * ===========================================*/


    });