/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntFenqiServiceList.service",
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data);
            fftjlistDatas=data;
            /*模板插入*/
            $('#myTemplate5').tmpl(fftjlistDatas).appendTo('#fftjlistData');
        },
        error: function () {
            alert("错误");
        }
    });
})

