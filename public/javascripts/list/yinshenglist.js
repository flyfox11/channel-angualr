/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntYinshengbaoList.service",
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data);
            yingshengDatas=data;
            /*模板插入*/
            $('#myTemplate4').tmpl(yingshengDatas).appendTo('#yingshengData');
        },
        error: function () {
            alert("错误");
        }
    });
})
