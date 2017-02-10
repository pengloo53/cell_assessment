/**
 * Created by 118663 on 2017/1/5.
 * DB handle : delete data
 */

var connect = require('./connect.js');

// user table : 根据id删除普通用户
exports.delUser = function (id, callback) {
  var sql = 'update user set dmark = "x" where uid = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// admin table : 根据id删除考核管理员
exports.delAdmin = function (id, callback) {
  var sql = 'update admin set dmark = "x" where aid = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// dept table : 根据id删除组织信息
exports.delDept = function (id, callback) {
  var sql = 'update dept set dmark = "x" where did = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// type table : 根据id删除类别信息
exports.delType = function (id, callback) {
  var sql = 'update type set dmark = "x" where tid = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// log table : 根据id删除日志信息
exports.delType = function (id, callback) {
  var sql = 'update log set dmark = "x" where lid = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};