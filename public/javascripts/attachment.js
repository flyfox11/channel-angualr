function doUpload() {
    var formData = new FormData($( "#uploadForm" )[0]);
    $.ajax({
        url: 'http://59.110.42.180:8081/myrisk/admin/fileUpload.service' ,
        type: 'post',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            console.log(returndata);
            location.reload();
        },
        error: function (returndata) {
            alert("失败");
        }
    });
}

/*
$(function(){
    $.ajax({
        url: 'http://59.110.42.180:8081/myrisk/admin/doFindAllFiles.service' ,
        type: "post",
        async:false,
        datatype: "json",
        success: function (data) {
            console.log(data);
            var str="";
            var num = 1;
            for( var key in data){
                str+='<li id='+data[key].id+'>'+num+' : <a href="http://59.110.42.180:8081/myrisk/admin/download.service?path='+data[key].filepath+'">'+data[key].filename+'</a></li>'
                num++;
            }
            $(".down-list").html(str);
        },
        error: function () {
            alert("错误");
        }
    });
})*/
