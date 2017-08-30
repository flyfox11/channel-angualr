/**
 * Created by lingxi on 2017/5/23.
 */
window.onload = function () {
    (function () {
        //时间插件
        if ($('.datetimepicker').length) {
            $('.datetimepicker').each(function () {
                var offset = $(this).attr('offset') || 'top-left';
                $(this).datetimepicker({
                    minView: 'month',
                    format:"yyyy-mm-dd",
                    language: 'zh-CN',
                    autoclose: true,
                    todayBtn: true,
                    pickerPosition: offset
                });
            });
        }
    })()
}
