
angular.module("subApp")
    .controller('CustomerController', function ($scope,
                                             $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.selectedCusIndex=0;//tab索引
        $scope.data.cusMenus=[{cname:'融资产品信息',curi:'#'},{cname:'企业概况',curi:'#'},{cname:'主要经营者',curi:'#'}];//tab页信息

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
        $scope.action.selectCusMenu=function (index) {
             $scope.data.selectedCusIndex=index;
            if(index==1){
                //与子controller之间通信
                $scope.$broadcast('getCompanyProfileData', "获取企业概况数据");
            }else if(index==2){
                //与子controller之间通信
                $scope.$broadcast('getMainManagerData', "获取主要经营者数据");
            }
        }


        /** ==========================================
         *          内部函数
         * ===========================================*/


    });