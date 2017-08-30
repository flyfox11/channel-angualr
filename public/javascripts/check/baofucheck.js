/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntBaofuByIdService.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            $(".company_order_num").html(data.company_order_num);
            $(".baofu_order_num").html(data.baofu_order_num);
            $(".goods_name").html(data.goods_name);
            $(".user_name").html(data.user_name);
            $(".pay_way").html(data.pay_way);
            $(".create_time").html(data.create_time);
            $(".order_status").html(data.order_status);
            $(".oeder_amt").html(data.oeder_amt);
            $(".success_amt").html(data.success_amt);
            $(".service_fee").html(data.service_fee);
            $(".card_name").html(data.card_name);
            $(".card_num").html(data.card_num);
            $(".fault_reason").html(data.fault_reason);
            $(".start_time").html(data.start_time);
            $(".end_time").html(data.end_time);
            $(".addition").html(data.addition);
        },
        error: function () {
            alert("错误");
        }
    });
})

