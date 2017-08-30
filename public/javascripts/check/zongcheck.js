/**
 * Created by hanxiaofang on 2017/3/4.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntRentStat2ById.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            $(".zong-name").html(data.name);
            $(".zong-sf").html(data.idcard);
            $(".zong-phone").html(data.mobile);
            $(".zong-mail").html(data.email);
            $(".zong-address").html(data.address);
            $(".zong-shop").html(data.company_name);
            $(".zong-data").html(data.apply_date);
            $(".zong-day").html(data.rent_date);
            $(".zong-qs").html(data.apply_periods);
            $(".zong-syqs").html(data.remain_periods);
            $(".zong-je").html(data.apply_amt);
            $(".zong-je2").html(data.m_rent_amt);
            $(".zong-ye").html(data.loan_amt);
            $(".zong-kh").html(data.bank_card);
        },
        error: function () {
            alert("错误");
        }
    });
})

