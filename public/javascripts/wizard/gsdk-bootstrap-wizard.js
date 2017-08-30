/*!

 =========================================================
 * Bootstrap Wizard - v1.1.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/bootstrap-wizard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/bootstrap-wizard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Get Shit Done Kit Bootstrap Wizard Functions

searchVisible = 0;
transparent = true;

$(document).ready(function () {

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3
            },
            lastname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                minlength: 3,
            }
        }
    });
    var tempcurrent = 1;
    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function (tab, navigation, index) {
            //按钮操作
            var flag = true;
            flag = tob1();
            if(index == 2){
                flag = tob2();
                loanMoney();
            }else{
                $('#loan_amount').val('');
            }

            if (flag) {
                var $valid = $('.wizard-card form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            } else {
                return false;
            }
        },

        onInit: function (tab, navigation, index) {
            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            $width = 100 / $total;
            var $wizard = navigation.closest('.wizard-card');

            $display_width = $(document).width();

            if ($display_width < 600 && $total > 3) {
                $width = 50;
            }

            navigation.find('li').css('width', $width + '%');
            $first_li = navigation.find('li:first-child a').html();
            //$moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
            $moving_div = $('<div>' + '' + '</div>');
            $('.wizard-card .wizard-navigation').append($moving_div);
            refreshAnimation($wizard, index);
            $('.moving-tab').css('transition', 'transform 0s');
        },

        onTabClick: function (tab, navigation, index) {
            //上面选项卡操作
            return false;
            if (!!flag) {
                var $valid = $('.wizard-card form').valid();
                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },

        onTabShow: function (tab, navigation, index) {

            var $total = navigation.find('li').length;
            var $current = index + 1;
            if(!!window.selectTr){
                var order = window.selectTr.attr('is_order');
                var flag = true;
                if(order != '0' && tempcurrent == 1){
                    $current = 3;
                    tempcurrent =  $current;
                    index = $current - 1;
                    flag = false;
                }
                if(order != '0' && tempcurrent == 3 && flag){
                    $current = 1;
                    tempcurrent =  $current;
                    index = $current - 1;
                }
                $(".tab-pane").hide();
                $(".tab-pane").eq(index).show();
            }

            var $wizard = navigation.closest('.wizard-card');
            // If it's the last tab then hide the last button and show the finish instead

            if ($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

        }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
        readURL(this);
    });


    $('.set-full-height').css('height', 'auto');

});


//Function to show image before upload

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(window).resize(function () {
    $('.wizard-card').each(function () {
        $wizard = $(this);
        index = $wizard.bootstrapWizard('currentIndex');
        refreshAnimation($wizard, index);

        $('.moving-tab').css({
            'transition': 'transform 0s'
        });
    });
});

function refreshAnimation($wizard, index) {
    total_steps = $wizard.find('li').length;
    move_distance = $wizard.width() / total_steps;
    step_width = move_distance;
    move_distance *= index;

    $wizard.find('.moving-tab').css('width', step_width);
    $('.moving-tab').css({
        'transform': 'translate3d(' + move_distance + 'px, 0, 0)',
        'transition': 'all 0.3s ease-out'

    });
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
function tob1() {
    if (!window.selectTr) {
        jDialog.alert('请选择信贷产品!');
        return false;
    }else{
        return true;
    }
    //else {
    //    if (window.selectTr.attr('is_order') * 1 == 0) {
    //        jDialog.alert('选择的信贷产品无订单!');
    //        return false;
    //    }
    //}
}
function tob2() {
    if (!window.selectTrOrder) {
        jDialog.alert('请选择订单!');
        return false;
    }else{
        return true;
    }
}
//计算贷款金额
function loanMoney(){
    var amt = window.selectTrOrder.find("td:eq(2)").html();
    var max_mul = window.selectTr.find("td:eq(14)").html();
    var total = Math.floor(amt * max_mul / 100) * 100;
    $('#loan_amount').val(total);
}