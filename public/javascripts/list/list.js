/**
 * Created by hanxiaofang on 2017/3/1.
 */
$(function(){
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntRentStatList.service",
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data);
            rentDatas=data;
            /*模板插入*/
            $('#myTemplate').tmpl(rentDatas).appendTo('#rentData');
        },
        error: function () {
            alert("错误");
        }
    });
})
