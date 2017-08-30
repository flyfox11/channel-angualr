/**
 * Created by Administrator on 2017/7/10.
 */

angular.module("subApp")
    .controller('FinancialFactorsController', function ($scope,
                                                    $timeout,subAppResource) {

        /** ==========================================
         *          初始化
         * ===========================================*/
        $scope.data = {};                 // 数据集合
        $scope.setting = {};              // 设置集合
        $scope.action = {};               // 动作集合
        $scope.data.viewFlag=0;//视图标识--0：资产负债列表页1：资产负债编辑页
        $scope.data.actionFlag='add';//操作标识--新增'add',修改'update'
        $scope.data.balance={//资产负债对象

        }
        $scope.data.yearNames = ["年初", "期末"];
        $scope.data.params={   //分页相关对象
            pageNum:1,
            pageSize:10,
        }
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

        $scope.$on("getFinancialFatorsData", function(event, data) {

            getData();
        });
        $scope.action.getBalanceByYear=function ($event,year) {
            $event.stopPropagation();
            subAppResource.GetBalanceById.get({
                company_id:$scope.data.company_id,
                year:year
            }).$promise.then(function (indata) {
                $scope.data.balance=indata.data;
                $scope.data.viewFlag=2;
                $scope.data.selectedRowIndex=-1; //重置tr选中索引
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }
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
            $scope.data.balance={};//重新置空
            $scope.data.viewFlag=1;
            $scope.data.actionFlag='add';
        }

        //点击修改按钮
        $scope.action.updateRow=function () {
            if($scope.data.selectedRowIndex>=0){
                subAppResource.GetBalanceById.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id,
                    year:$scope.data.Infos[$scope.data.selectedRowIndex].year
                }).$promise.then(function (indata) {
                    $scope.data.balance=indata.data;
                    $scope.data.actionFlag='update';
                    $scope.data.viewFlag=1;
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else{
                jDialog.alert('请选中一条记录');
            }
        }
        //点击删除按钮
        $scope.action.deleteRow=function (index) {
            if($scope.data.selectedRowIndex>=0){

                subAppResource.DeleteBalance.get({
                    company_id:$scope.data.Infos[$scope.data.selectedRowIndex].company_id,
                    year:$scope.data.Infos[$scope.data.selectedRowIndex].year,
                }).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.selectedRowIndex=-1; //重置tr选中索引
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
                //重新获取数据
                getData();
            }else{
                jDialog.alert('请选择一条记录');
            }
        }

        //点击保存按钮
        $scope.action.saveRow=function (actionFlag) {
            if(actionFlag=='add'){
                //存货
                $scope.data.balance.inventories=parseInt($scope.data.balance.raw_materials)+parseInt($scope.data.balance.doing_goods)+
                    parseInt($scope.data.balance.finished_goods)+parseInt($scope.data.balance.zhouzhuan_materials);
                //流动资产合计
                $scope.data.balance.total_current_assets=$scope.data.balance.inventories+parseInt($scope.data.balance.other_current_assets)+
                    parseInt($scope.data.balance.other_receivables)+
                    parseInt($scope.data.balance.interes_receivable)+
                    parseInt($scope.data.balance.dividend_receivable)+
                    parseInt($scope.data.balance.accounts_prepaid)+
                    parseInt($scope.data.balance.accounts_receivable)+
                    parseInt($scope.data.balance.notes_receivable)+
                    parseInt($scope.data.balance.short_term_investments)+
                    parseInt($scope.data.balance.cash);
                //非流动资产合计
                $scope.data.balance.total_non_current_assets=parseInt($scope.data.balance.other_non_current_assets)+
                    parseInt($scope.data.balance.deferred_assets)+
                    parseInt($scope.data.balance.development_expend)+
                    parseInt($scope.data.balance.intangible_assets)+
                    parseInt($scope.data.balance.capitalized_biological_assets)+
                    parseInt($scope.data.balance.disposal_fixed_assets)+
                    parseInt($scope.data.balance.project_material)+
                    parseInt($scope.data.balance.construction_in_progress)+
                    parseInt($scope.data.balance.fixed_assets_book_value)-
                    parseInt($scope.data.balance.accumulated_dpreciation)+
                    parseInt($scope.data.balance.fixed_assets_cost)+
                    parseInt($scope.data.balance.long_term_equity_investment)+
                    parseInt($scope.data.balance.long_term_securities_investment);
                //资产总计
                $scope.data.balance.total_assets=$scope.data.balance.total_current_assets+$scope.data.balance.total_non_current_assets;
                //流动负债合计
                $scope.data.balance.total_current_liabilities=parseInt($scope.data.balance.other_current_liabilities)+
                    parseInt($scope.data.balance.other_creditors)+
                    parseInt($scope.data.balance.profits_payable)+
                    parseInt($scope.data.balance.interes_payable)+
                    parseInt($scope.data.balance.taxes_payable)+
                    parseInt($scope.data.balance.accrued_payroll)+
                    parseInt($scope.data.balance.advances_from_customers)+
                    parseInt($scope.data.balance.accounts_payable)+
                    parseInt($scope.data.balance.notes_payable)+
                    parseInt($scope.data.balance.short_term_loans);
                //非流动负债合计
                $scope.data.balance.total_non_current_liabilities=parseInt($scope.data.balance.long_term_loans_payable)+
                    parseInt($scope.data.balance.long_term_accounts_payable)+
                    parseInt($scope.data.balance.deferred_income)+
                    parseInt($scope.data.balance.other_non_current_liabilities);
                //负债合计
                $scope.data.balance.total_liabilities= $scope.data.balance.total_current_liabilities+$scope.data.balance.total_non_current_liabilities;
                //所有者权益合计
                $scope.data.balance.total_shareholders_equity=parseInt($scope.data.balance.subscribed_capital)+
                    parseInt($scope.data.balance.capital_surplus)+
                    parseInt($scope.data.balance.surplus_reserve)+
                    parseInt($scope.data.balance.retained_earnings);
                //负债及所有者权益总计
                $scope.data.balance.total_liabilities_equity=$scope.data.balance.total_liabilities+$scope.data.balance.total_shareholders_equity;
                //年初-期末
                /*
                if($scope.data.selectedName=='年初'){
                    $scope.data.balance.start_date=$scope.data.balance.year+'-01-01';
                }else{
                    $scope.data.balance.end_date=$scope.data.balance.year+'-12-31';
                }*/
                $scope.data.balance.start_date=$scope.data.balance.year+'-01-01';
                $scope.data.balance.end_date=$scope.data.balance.year+'-12-31';
                $scope.data.balance.company_id=$scope.data.company_id;
                console.log('需要打印的信息',$scope.data.balance.inventories);
                subAppResource.AddBalance.get($scope.data.balance).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }else if(actionFlag=='update'){
                subAppResource.UpdateBalance.get($scope.data.balance).$promise.then(function (indata) {
                    jDialog.alert(indata.msg);
                    $scope.data.viewFlag=0;
                    //重新获取数据
                    getData();
                }, function (reject) {
                    console.log('错误信息:',reject);
                });
            }
        }



        //返回
        $scope.action.back=function(){
            $scope.data.viewFlag=0;
        }
        //翻页
        $scope.action.getDataByPage = function () {
            $scope.data.params.pageNum = $scope.data.current_page;
            getData();
        };
        /** ==========================================
         *          内部函数
         * ===========================================*/
        function getData(){
            $scope.data.params.company_id=$scope.data.company_id;
            subAppResource.GetBalance.get($scope.data.params).$promise.then(function (indata) {
                $scope.data.Infos=indata.data||[];
               /* $scope.data.current_page =indata.data.pageNum;                //当前页
                $scope.data.total_items =indata.data.total;                // 总数量
                $scope.data.total_pages =indata.data.pages;                // 总页码*/
            }, function (reject) {
                console.log('错误信息:',reject);
            });
        }

    });