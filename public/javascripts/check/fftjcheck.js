/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntFenqiByIdService.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            $(".period").html(data.period);
            $(".order_total_amt").html(data.order_total_amt);
            $(".amt").html(data.amt);
            $(".current_order_amt").html(data.current_order_amt);
            $(".loaning_amt").html(data.loaning_amt);
            $(".remark").html(data.remark);
        },
        error: function () {
            alert("错误");
        }
    });
})

