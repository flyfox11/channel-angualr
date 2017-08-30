/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntRongbaoById.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data.name);
            $(".num").html(data.num);
            $(".company_name").html(data.company_name);
            $(".company_num").html(data.company_num);
            $(".company_batch_num").html(data.company_batch_num);
            $(".company_order_num").html(data.company_order_num);
            $(".order_num").html(data.order_num);
            $(".bank_order_num").html(data.bank_order_num);
            $(".withhold_num").html(data.withhold_num);
            $(".order_status").html(data.order_status);
            $(".oefer_amt").html(data.oefer_amt);
            $(".order_fee").html(data.order_fee);
            $(".bank_card").html(data.bank_card);
            $(".name").html(data.name);
            $(".idcard_type").html(data.idcard_type);
            $(".idcard").html(data.idcard);
            $(".mobile").html(data.mobile);
            $(".bank_name").html(data.bank_name);
            $(".cut_create_time").html(data.cut_create_time);
            $(".cut_end_time").html(data.cut_end_time);
            $(".remark").html(data.remark);
        },
        error: function () {
            alert("错误");
        }
    });
})

