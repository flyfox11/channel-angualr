/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntZhaohangList.service",
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data);
            zhzzlistheaderDatas=data.zhaohang;
            zhzzlistDatas=data.list;
            /*模板插入*/
            $('#myTemplate6').tmpl(zhzzlistheaderDatas).appendTo('#zhzzlistheaderData');
            $('#myTemplate7').tmpl(zhzzlistDatas).appendTo('#zhzzlistData');
        },
        error: function () {
            alert("错误");
        }
    });
})

