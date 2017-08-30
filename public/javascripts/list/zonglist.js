/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    $.ajax({
     url: "http://59.110.42.180:8081/myrisk/admin/doGetAntRentStat2List.service",
     type: "GET",
     async:false,
     datatype: "json",
     success: function (data) {
     console.log(data);
     zongDatas=data;
     //模板插入
     $('#myTemplate1').tmpl(zongDatas).appendTo('#zongData');
     },
     error: function () {
     alert("错误");
     }
     });
})