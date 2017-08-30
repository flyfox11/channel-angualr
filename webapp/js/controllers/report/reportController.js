/**
 * Created by 胡志甫 on 2017/7/10.
 */

angular.module("subApp")
    .controller('ReportController', function ($scope,
                                                $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合

        $scope.data.selectedReportIndex=0;//tab索引
        $scope.data.reportMenus=[
            {cname:'客户基本情况',curi:'#'},
            {cname:'非财务因素',curi:'#'},
            {cname:'财务因素',curi:'#'},
            {cname:'保证人',curi:'#'},
            {cname:'经营模式与经营策略',curi:'#'},
            {cname:'综合意见',curi:'#'}];//tab页信息
        $scope.data.reportMenus1=[
            {cname:'客户基本情况',curi:'#'},
            {cname:'非财务因素',curi:'#'},
            {cname:'保证人',curi:'#'},
            {cname:'经营模式与经营策略',curi:'#'},
            {cname:'综合意见',curi:'#'}];//tab页信息

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
        $scope.action.selectReportMenu=function (index) {
            $scope.data.selectedReportIndex=index;
            switch (index){
                case 1:
                    $scope.$broadcast('getNonFinancialFatorsData', "获取非财产因素数据");
                    break;
                case 2:
                    $scope.$broadcast('getFinancialFatorsData', "获取财产因素数据");
                    break;
                case 3:break;
                case 4:break;
                case 5:break;
                default:;
            }
        }


        /** ==========================================
         *          内部函数
         * ===========================================*/


    });