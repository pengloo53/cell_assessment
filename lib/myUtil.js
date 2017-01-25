/**
 * Created by 118663 on 2017/1/25.
 */

/* 获取日期 */
exports.getDate = function (date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var day = date.getDate();
  day = day < 10 ? '0' + day : day;
  return year + '' + month + '' + day + '';
};

/* 获取时间 */
exports.getTime = function (date) {
  var hour = date.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? '0' + second : second;
  return hour + '' + minute + '' + second + '';
};

/* 获取IP地址 */
exports.getIp = function (req) {
  var remoteIp = req.ip.match(/\d+\.\d+\.\d+\.\d+/);
  if (remoteIp) {
    return remoteIp;
  } else {
    return '127.0.0.1';
  }
};