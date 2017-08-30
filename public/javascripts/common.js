/**
 * Created by lingxi on 2017/5/23.
 */
window.onload = function () {
    (function () {
        //时间插件
        if ($('.datetimepicker').length) {
            $('.datetimepicker').each(function () {
                var offset = $(this).attr('offset') || 'top-left';
                $(this).datetimepicker({
                    minView: 'month',
                    format: "yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose: true,
                    todayBtn: true,
                    pickerPosition: offset
                });
            });
        }

        if ($('.form-pwd').length) {
            $('.form-pwd').each(function () {
                $(this).submit(function () {
                    if ($(".oldpwd").length && !$(".oldpwd").val()) {
                        alert('原密码不能为空');
                        return false;
                    }
                    if ($('.pwd1').length && !$('.pwd1').val()) {
                        alert('密码不能为空');
                        return false;
                    }
                    if ($('.pwd1').length && $('.pwd2').length && !($('.pwd1').val() === $('.pwd2').val())) {
                        alert('两次密码不一致');
                        return false;
                    }
                    if ($('.pwd1').length && $('.pwd2').length) {
                        var newpwd1 = $('.pwd2').val();
                        var flag = /^[a-zA-Z0-9]+$/.test(newpwd1);
                        var isAllNumber = /^[0-9]+$/.test(newpwd1);//只允许数字
                        var isAllLetter = /^[A-Za-z]+$/.test(newpwd1)//只允许字母\
                        if (!(newpwd1.length >= 6 && newpwd1.length <= 14 && flag && !isAllNumber && !isAllLetter)) {
                            alert('密码长度为6——14位，且数字与字母组合！');
                            $('.pwd1').val('');
                            $('.pwd2').val('');
                            return false;
                        }
                    }
                    //if (!!$(".oldpwd").length && !!$(".pwd1").length && $(".oldpwd").val() == $(".pwd1").val()) {
                    //    jDialog.alert('原密码不能与新密码一致');
                    //    return false;
                    //}
                });
            });
        }

        //表单输入框重置为空
        if($('form').find('.Reset-to-null').length){
            $(".Reset-to-null").click(function () {
               $(".form-control").val("");
            });
        }

        //表单提交
        if ($('.form-submit').length) {
            $(".form-submit").each(function () {
                $(this).submit(function () {
                    if (!!$(".oldPwd").length && !$('.oldPwd').val()) {
                        jDialog.alert('原密码不能为空');
                        return false;
                    }
                    if (!!$(".newPwd1").length && !!$(".newPwd1").length && !$(".newPwd1").val() && $(".newPwd1").val() != $(".newPwd2").val()) {
                        jDialog.alert('两次密码不一致');
                        return false;
                    }
                    var file = $(this).find(':file')[0];
                    if (!!file && !file.value) {
                        alert('请选择文件');
                        return false;
                    }
                })
            });
        }

        //文件下载
        if ($(".file-download").length) {
            $(".file-download").each(function () {
                $(this).click(function () {
                    var file_path = $(this).attr('file_path');
                    var file_name = $(this).attr('file_name');
                    if (!!file_path) {
                        var pathName = window.location.pathname;
                        var search = window.location.search;
                        if (!!search) {
                            location.href = '/file/download?fileUrl=' + file_path + '&fileName=' + file_name + '&redirecUrl=' + pathName + search;
                        } else {
                            location.href = '/file/download?fileUrl=' + file_path + '&fileName=' + file_name + '&redirecUrl=' + pathName;
                        }
                    } else {
                        jDialog.alert('缺少文件路径');
                    }

                });
            })
        }
    })()
}
