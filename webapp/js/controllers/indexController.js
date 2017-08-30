// --------------------- 客户基本情况 ---------------- //

angular.module("subApp")
    .controller('customerController', function ($scope,
                                             $timeout) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合


        /** ==========================================
         *          数据
         * ===========================================*/

        // 获取数据 - 来自路由
        $timeout(function () {
            console.log(angular.toJson($scope.initData.data) + "***");
            $scope.data.tabTitle = '嘉实动态';

        }, 0, true);


        /** ==========================================
         *          设置
         * ===========================================*/

        // 标签云设置
        $scope.swiper = {};
        $scope.setting.swiper_options = {
            pagination: '.swiper-pagination',
            paginationType: 'custom',
            grabCursor: true, //改变鼠标形状
            autoplayDisableOnInteraction: false, //操作后是否停止自动滑动
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            speed: 600,
            effect: 'slide',
            showNavButtons: true
        };

        /** ==========================================
         *          动作
         * ===========================================*/
        $scope.action.switchNews = function (title) {
            $scope.data.tabTitle = title;
        };

        // 联系客服（财富官网http://www.harvestwm.cn/）
        $scope.action.kfwin = function () {
            window.open('http://kefu.qycn.com/vclient/chat/?websiteid=75557&clerkid=&clienturl=http%3A%2F%2Fwww.harvestwm.cn%2F&originPageTitle=' + encodeURIComponent(window.document.title) + '&originPageUrl=' + encodeURIComponent(document.referrer) + '&originPageLocationUrl=' + encodeURIComponent(document.location.href), '_blank', 'toolbar=no,scrollbars=yes,menubar=no,status=no,resizable=yes,location=no,width=650,height=530,top=100,left=200');
        };

        /** ==========================================
         *          内部函数
         * ===========================================*/


    });