/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntYinshengbaoById.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            $(".trans_create_time").html(data.trans_create_time);
            $(".trans_end_time").html(data.trans_end_time);
            $(".order_num").html(data.order_num);
            $(".trans_num").html(data.trans_num);
            $(".trans_type").html(data.trans_type);
            $(".money_use").html(data.money_use);
            $(".get_amt").html(data.get_amt);
            $(".pay_amt").html(data.pay_amt);
            $(".service_fee").html(data.service_fee);
            $(".remain_amt").html(data.remain_amt);
            $(".account_num").html(data.account_num);
            $(".account_name").html(data.account_name);
        },
        error: function () {
            alert("错误");
        }
    });
})

