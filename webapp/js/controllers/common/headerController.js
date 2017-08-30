angular.module("subApp")
    .controller('HeaderController', function ($scope,$timeout) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.validate = {};             // 表单验证集合

        /** ==========================================
         *          数据
         * ===========================================*/
        $scope.data.title='首页';
        $scope.data.name='胡志甫';
        /*$scope.data.selectedIndex=0;*/
        $scope.data.menus=[{cname:'尽调报告',curi:'/report',icon:'fa-book'},{cname:'渠道分析',curi:'/channelAnalysis',icon:'fa-compress'}];

        $timeout(function () {
            $scope.data.selectedIndex=$scope.initIndex.index;
            $scope.data.title=$scope.data.menus[$scope.initIndex.index].cname;
        }, 0, true);

        /** ==========================================
         *          设置
         * ===========================================*/
        //表单验证条件--必须为正整数
        $scope.validate.number_required = function (value) {
            var reg = /^\+?[1-9][0-9]*$/;/*验证正整数*/
            if(value ===""){
                return true;
            }else{
                return reg.test(value);
            }
        };
        //表单验证条件--必须为数字
        $scope.validate.double_required = function (value) {
            var reg = /^\d+(\.\d+)?$/;/*验证数字*/
            if(value ===""){
                return true;
            }else{
                return reg.test(value);
            }
        };
        /** ==========================================
         *          动作
         * ===========================================*/
        $scope.action.select=function (index) {
            $scope.data.selectedIndex=index;
        }

        /** ==========================================
         *          内部函数
         * ===========================================*/

    });

