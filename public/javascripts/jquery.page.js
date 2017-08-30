(function ($) {
    var ms = {
        init: function (obj, args) {
            return (function () {
                ms.fillHtml(obj, args);
                ms.bindEvent(obj, args);
            })();
        },
        //填充html
        fillHtml: function (obj, args) {
            var tabStr = !!args.tab ? args.tab : '';
            return (function () {
                obj.empty();
                //上一页
                if (args.current > 1) {
                    obj.append('<a href="' + args.urlSegment + '?current=1' + tabStr + '" class="prevPage">首页</a>');
                    obj.append('<a href="' + args.urlSegment + '?current=' + (args.current - 1) + tabStr + '" class="prevPage">上一页</a>');
                } else {
                    obj.remove('.prevPage');
                    obj.append('<span class="disabled">首页</span>');
                    obj.append('<span class="disabled">上一页</span>');
                }
                //中间页码
                if (args.current * 1 != 1 && args.current * 1 >= 4 && args.pageCount != 4) {
                    obj.append('<a href="' + args.urlSegment + '?current=1' + tabStr + '" class="tcdNumber">' + 1 + '</a>');
                }
                if (args.current * 1 - 2 > 2 && args.current * 1 <= args.pageCount && args.pageCount > 5) {
                    obj.append('<span class="page_pointer">...</span>');
                }
                var start = args.current * 1 - 2, end = args.current * 1 + 2;
                if ((start > 1 && args.current * 1 < 4) || args.current * 1 == 1) {
                    end++;
                }
                if (args.current * 1 > args.pageCount - 4 && args.current * 1 >= args.pageCount) {
                    start--;
                }
                for (; start <= end; start++) {
                    if (start <= args.pageCount && start >= 1) {
                        if (start != args.current) {
                            obj.append('<a href="' + args.urlSegment + '?current=' + start + tabStr + '" class="tcdNumber">' + start + '</a>');
                        } else {
                            obj.append('<span class="current">' + start + '</span>');
                        }
                    }
                }
                if (args.current * 1 + 2 < args.pageCount - 1 && args.current * 1 >= 1 && args.pageCount > 5) {
                    obj.append('<span class="page_pointer">...</span>');
                }
                if (args.current * 1 != args.pageCount && args.current * 1 < args.pageCount - 2 && args.pageCount != 4) {
                    obj.append('<a href="' + args.urlSegment + '?current=' + args.pageCount + tabStr + '" class="tcdNumber">' + args.pageCount + '</a>');
                }
                //下一页
                if (args.current < args.pageCount) {
                    // obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
                    obj.append('<a href="' + args.urlSegment + '?current=' + (parseInt(args.current) + 1) + tabStr + '" class="nextPage">下一页</a>');
                    obj.append('<a href="' + args.urlSegment + '?current=' + (args.pageCount) + tabStr + '" class="nextPage">尾页</a>');
                } else {
                    obj.remove('.nextPage');
                    obj.append('<span class="disabled">下一页</span>');
                    obj.append('<span class="disabled">尾页</span>');
                }
                if (args.total > 0) {
                    obj.append('<span style="margin-left: 18px;border:none;color:#bfbfbf;font-size:12px;">共<span style="border:none;color:#428bca;">' + args.total + '</span>条记录</span>');
                }
            })();
        },
        //绑定事件
        bindEvent: function (obj, args) {
            return (function () {
                obj.on("click", "a.tcdNumber", function () {
                    var current = parseInt($(this).text());
                    ms.fillHtml(obj, {"current": current, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                obj.on("click", "a.prevPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {"current": current - 1, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                obj.on("click", "a.nextPage", function () {
                    var current = parseInt(obj.children("span.current").text());
                    ms.fillHtml(obj, {"current": current + 1, "pageCount": args.pageCount});
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });
            })();
        }
    }
    $.fn.createPage = function (options) {
        var args = $.extend({
            pageCount: 15,
            current: 1,
            tab: null,
            urlSegment: '',
            param: '',
            total: '',
            backFn: function () {
            }
        }, options);
        ms.init(this, args);
    }
})(jQuery);