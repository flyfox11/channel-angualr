/**
 * Created by hanxiaofang on 2017/3/2.
 */
$(function(){
    var url=document.URL;
    var urlArry=url.split("=");
    var Id=urlArry[1];
    $.ajax({
        url: "http://59.110.42.180:8081/myrisk/admin/doGetAntZhaohangById.service?id="+Id,
        type: "GET",
        async:false,
        datatype: "json",
        success: function (data) {
            $(".zh-jyr").html(data.field1);
            $(".zh-jysj").html(data.field2);
            $(".zh-qxr").html(data.field3);
            $(".zh-jylx").html(data.field4);
            $(".zh-jfje").html(data.field5);
            $(".zh-dfje").html(data.field6);
            $(".zh-zy").html(data.field7);
            $(".zh-lsh").html(data.field8);
            $(".zh-lcslh").html(data.field9);
            $(".zh-ywmc").html(data.field10);
            $(".zh-yt").html(data.field11);
            $(".zh-ywckh").html(data.field12);
            $(".zh-ywzy").html(data.field13);
            $(".zh-qtzy").html(data.field14);
            $(".zh-sffhm").html(data.field15);
            $(".zh-sfmc").html(data.field16);
            $(".zh-sfzh").html(data.field17);
            $(".zh-sfkhhhh").html(data.field18);
            $(".zh-sffkhhm").html(data.field19);
            $(".zh-sfkhhdz").html(data.field20);
            $(".zh-mzgsfhm").html(data.field21);
            $(".zh-mzgszh").html(data.field22);
            $(".zh-mzgsmc").html(data.field23);
            $(".zh-xxbz").html(data.field24);
            $(".zh-sffjxx").html(data.field25);
            $(".zh-czbz").html(data.field26);
            $(".zh-kzzy").html(data.field27);
            $(".zh-jyfxm").html(data.fiel28);
            $(".zh-pjh").html(data.fiel29);
            $(".zh-swzfddh").html(data.field30);
            $(".zh-num").html(data.field31);
        },
        error: function () {
            alert("错误");
        }
    });
})

