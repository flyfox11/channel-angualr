/**
 * 范围选择器: ionRangeSlider - Directive for Ion Range Slider
 */

function ionRangeSlider($timeout) {
    return {
        restrict: 'EA',
        require : '^ngModel',
        scope: {
            min       : '=',
            max       : '=',
            type      : '@',
            prefix    : '@',
            maxPostfix: '@',
            prettify  : '@',
            grid      : '@',
            gridNum  : '@',
            gridMargin: '@',
            postfix   : '@',
            step      : '@',
            hideMinMax: '@',
            hideFromTo: '@',
            from      : '=',
            to        : '=',
            disable   : '=',
            onChange  : '=',
            onFinish  : '=',
            ngModel   : '&'
        },
        template: '<div></div>',
        replace: true,
        link: function(scope, element, attrs, modelCtrl) {
            //var sliderInstance;
            (function init() {
                $(element).ionRangeSlider({
                    min       : scope.min,
                    max       : scope.max,
                    type      : scope.type,
                    prefix    : scope.prefix,
                    max_postfix: scope.maxPostfix,
                    prettify  : scope.prettify,
                    grid      : scope.grid,
                    grid_num  : scope.gridNum,
                    grid_margin: scope.gridMargin,
                    postfix   : scope.postfix,
                    step      : scope.step,
                    hide_min_max: scope.hideMinMax,
                    hide_from_to: scope.hideFromTo,
                    from      : scope.from,
                    to        : scope.to,
                    disable   : scope.disable,
                    onChange  : scope.onChange,
                    onFinish  : setRangeResult
                });
                //sliderInstance = $(element).data("ionRangeSlider");

            })();

            function setRangeResult (indata){
                scope.$evalAsync(function() {
                    if(scope.type == 'single') {
                        var values = indata.from;
                    }else{
                        var values = [indata.from,　indata.to];
                    }

                    modelCtrl.$setViewValue(values);
                });
            }

            scope.$watch('min', function(value) {
                $timeout(function() {
                    if(!!$(element).data("ionRangeSlider")){
                        $(element).data("ionRangeSlider").update({
                            min: value
                        });
                    }
                });
            }, true);
            scope.$watch('max', function(value) {
                $timeout(function() {
                    if(!!$(element).data("ionRangeSlider")){
                        $(element).data("ionRangeSlider").update({
                            max: value
                        });
                    }
                });
            });
            scope.$watch('from', function(value) {
                $timeout(function() {
                    if(!!$(element).data("ionRangeSlider")){
                        $(element).data("ionRangeSlider").update({
                            from: value
                        });
                    }
                });
            });
            scope.$watch('to', function(value) {
                $timeout(function() {
                    if(!!$(element).data("ionRangeSlider")){
                        $(element).data("ionRangeSlider").update({
                            to: value
                        });
                    }

                });
            });
            scope.$watch('disable', function(value) {
                $timeout(function() {
                    if(!!$(element).data("ionRangeSlider")){
                        $(element).data("ionRangeSlider").update({
                            disable: value
                        });
                    }
                });
            });
        }
    };
}

function stickyNav($window){
    function stickyNavLink(scope, element){
        var w = angular.element($window),
            size = element[0].clientHeight,
            top = 0;

            function toggleStickyNav(){
            if(!element.hasClass('sticky') && $window.pageYOffset > top + size){
                element.addClass('sticky');
            } else if(element.hasClass('sticky') && $window.pageYOffset <= top + size){
                element.removeClass('sticky');
            }
        }



        scope.$watch(function(){
            return element[0].getBoundingClientRect().top + $window.pageYOffset;
        }, function(newValue, oldValue){
            if(newValue !== oldValue && !element.hasClass('sticky')){
                top = newValue;
            }
        });

        w.bind('resize', function stickyNavResize(){
            element.removeClass('sticky');
            top = element[0].getBoundingClientRect().top + $window.pageYOffset;
            toggleStickyNav();
        });
        w.bind('scroll', toggleStickyNav);
    }

    return {
        scope: {},
        restrict: 'A',
        link: stickyNavLink
    };
}




angular
    .module('subApp.directives')
    .directive('ionRangeSlider', ['$timeout',ionRangeSlider])
    .directive('stickyNav', ['$window',stickyNav]);

/**
 * uiValidate 表单验证
 */

angular.module('subApp.directives').directive('uiValidate', function () {
    'use strict';

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var validateFn, validators = {},
                validateExpr = scope.$eval(attrs.uiValidate);

            if (!validateExpr){ return;}

            if (angular.isString(validateExpr)) {
                validateExpr = { validator: validateExpr };
            }

            angular.forEach(validateExpr, function (exprssn, key) {
                validateFn = function (valueToValidate) {
                    var expression = scope.$eval(exprssn, { '$value' : valueToValidate });
                    if (angular.isObject(expression) && angular.isFunction(expression.then)) {
                        // expression is a promise
                        expression.then(function(){
                            ctrl.$setValidity(key, true);
                        }, function(){
                            ctrl.$setValidity(key, false);
                        });
                        return valueToValidate;
                    } else if (expression) {
                        // expression is true
                        ctrl.$setValidity(key, true);
                        return valueToValidate;
                    } else {
                        // expression is false
                        ctrl.$setValidity(key, false);
                        return valueToValidate;
                    }
                };
                validators[key] = validateFn;
                ctrl.$formatters.push(validateFn);
                ctrl.$parsers.push(validateFn);
            });

            function apply_watch(watch)
            {
                //string - update all validators on expression change
                if (angular.isString(watch))
                {
                    scope.$watch(watch, function(){
                        angular.forEach(validators, function(validatorFn){
                            validatorFn(ctrl.$modelValue);
                        });
                    });
                    return;
                }

                //array - update all validators on change of any expression
                if (angular.isArray(watch))
                {
                    angular.forEach(watch, function(expression){
                        scope.$watch(expression, function()
                        {
                            angular.forEach(validators, function(validatorFn){
                                validatorFn(ctrl.$modelValue);
                            });
                        });
                    });
                    return;
                }

                //object - update appropriate validator
                if (angular.isObject(watch))
                {
                    angular.forEach(watch, function(expression, validatorKey)
                    {
                        //value is string - look after one expression
                        if (angular.isString(expression))
                        {
                            scope.$watch(expression, function(){
                                validators[validatorKey](ctrl.$modelValue);
                            });
                        }

                        //value is array - look after all expressions in array
                        if (angular.isArray(expression))
                        {
                            angular.forEach(expression, function(intExpression)
                            {
                                scope.$watch(intExpression, function(){
                                    validators[validatorKey](ctrl.$modelValue);
                                });
                            });
                        }
                    });
                }
            }
            // Support for ui-validate-watch
            if (attrs.uiValidateWatch){
                apply_watch( scope.$eval(attrs.uiValidateWatch) );
            }
        }
    };
})
    .directive('dateTimePicker', function() { //日期插件
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: {
                ngModel: '=',
                start: '='
            },
            template: '<input type="text" readonly>',
            link: function (scope, element, attrs, ngModel) {
                var input = element;

                input.datetimepicker({
                    minView: "month", //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    bootcssVer:3,
                    todayBtn: true,
                    pickerPosition: attrs.position,
                    startDate: scope.start||"",
                });

                element.bind('click', function () {
                    ngModel.$modelValue = input.val();
                    // ngModel.$$rawModelValue=input.val();
                    //console.log(input.val(),scope.start)
                    if(scope.start){
                        input.datetimepicker('setStartDate', scope.start);
                    }
                });
            }
        }
    });



