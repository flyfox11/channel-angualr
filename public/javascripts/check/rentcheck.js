/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntRentStatById.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data.name);
            $(".rent-name").html(data.name);
            $(".rent-sf").html(data.idCard);
            $(".rent-phone").html(data.mobile);
            $(".rent-mail").html(data.email);
            $(".rent-data").html(data.applyDate);
            $(".rent-day").html(data.rent_date);
            $(".rent-qs").html(data.apply_periods);
            $(".rent-je").html(data.apply_amt);
            $(".rent-ye").html(data.loan_amt);
            $(".rent-kh").html(data.bank_card);
        },
        error: function () {
            alert("错误");
        }
    });
})

