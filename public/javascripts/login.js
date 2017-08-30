/**
 * Created by hanxiaofang on 2017/3/1.
 */
$(function(){
    $("#loginbtn").click(function(){
        var username=$('#userName').val();
        var password=$('#password').val();
        if ($('#userName').val() == "" || $('#password').val() == "") {
            alert("用户名或密码不能为空！");
        }
        else{
            $.ajax({
            url: "http://59.110.42.180:8081/myrisk/admin/doGetUserLogin.service",
            type: "GET",
            async:false,
            data: {//加入的文本参数
                "Real_name":username,
                "Pwd":password
            },
            datatype: "json",
            success: function (data) {
                console.log(data);
                if(data!=null) {
                    alert("登录成功");
                    parent.document.location.href = "/index";
                }else{
                    alert("登录失败");
                }
            },
            error: function () {
                alert("错误");
            }
        });
        }
    })
})
