/**
 * Created by home on 2017/5/12.
 */
module.exports = lib = {};
//提取状态码
lib.outPutStatusCode = function (str) {
    var statusCode = "";
    str.replace(/<h1>(.*)<\/h1>/g, function (first, second) {
        statusCode = second;;
    });
    return statusCode
}
//提取描述信息
lib.outPutMessage = function (str) {
    var message = "";
    str.replace(/description<\/b> <u>(.*)<\/u>/g, function (first, second) {
        message = second;
    });
    return message;
}