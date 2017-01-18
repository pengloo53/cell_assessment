/**
 * Created by 118663 on 2016/12/27.
 * DB handle , Select sql
 */

var connect = require('./connect.js');

/********************* user table ******************************/
// 获取普通员工列表
exports.getUsers = function(callback){
  var sql = 'select * from user where dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};
// 根据员工号获取单个用户信息
exports.getUserInfo = function (userid, callback) {
  var sql = 'select * from user where userid = "' + userid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/***************************************************************/

/********************* admin table *****************************/
// 获取考核员列表
exports.getAdmins = function (callback){
  var sql = 'select * from admin where dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};

// 根据员工号获取单个考核员信息
exports.getAdminInfo = function (adminid, callback) {
  var sql = 'select * from admin a left join dept d on a.did=d.did where adminid= "' + adminid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/*****************************************************************/

/********************* log table ********************************/
// 获取log信息列表
exports.getLog = function(callback){
  var sql = 'select * from log where dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};

// 获取某个员工的Log信息
exports.getLogByUser = function(userid,callback){
  var sql = 'select * from log where userid ="' + userid + '" and dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  })
};
/************************************************************/

/********************* dept table ***************************/
// 获取部门信息列表
exports.getDepts = function(callback){
  var sql = 'select * from dept where dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};

// 根据id获取部门信息
exports.getDeptById = function(did,callback){
  var sql = 'select * from dept where did = ' + did;
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};

/***********************************************************/

/********************* type table **************************/
// 获取类别表信息列表
exports.getTypes = function(callback){
  var sql = 'select * from type where dmark != "x"';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};

// 根据id获取类别信息
exports.getTypeById = function(id,callback){
  var sql = 'select * from type where tid = ' + id;
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  })
};

/***********************************************************/