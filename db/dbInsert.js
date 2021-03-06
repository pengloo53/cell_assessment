/**
 * Created by 118663 on 2017/1/5.
 * DB handle : insert data
 */

var connect = require('./connect.js');

/**************** add user ******************/
exports.addUser = function (userid, username, department, office, produce, team, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into user (userid,username,did,crtdate,crttime,crtuser) values ("' +
      userid + '","' +
      username + '",(select did from dept where department = "' +
      department + '" and office = "' +
      office + '" and produce = "' +
      produce + '" and team="' +
      team + '"),"' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据did插入用户
exports.addUserByDid = function (userid, username, did, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into user (userid,username,did,crtdate,crttime,crtuser) values ("' +
      userid + '","' +
      username + '",' +
      did + ',"' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 批量上传用户
/*exports.addUsers = function(data,callback){
  var sql = 'insert into user (userid ,username,did,crtdate,crttime,crtuser) values(' + data + ')';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};*/

/**************** add admin *****************/
exports.addAdmin = function (adminid, adminname, department, office, produce, team, password, type, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into admin (adminid, adminname, did, password, type, crtdate, crttime, crtuser) values ("' +
      adminid + '","' +
      adminname + '",(select did from dept where department = "' +
      department + '" and office = "' +
      office + '" and produce = "' +
      produce + '" and team="' +
      team + '"),"' +
      password + '","' +
      type + '","' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/**************** add log *******************/
exports.addLog = function (userid, type1, type2, type3, score, scoredate, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into log (userid,type1,type2,type3,score,scoredate,crtdate,crttime,crtuser) values ("' +
      userid + '","' +
      type1 + '","' +
      type2 + '","' +
      type3 + '",' +
      score + ',"' +
      scoredate + '","' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/**************** add type ******************/
exports.addType = function (type1, type2, type3, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into type (type1,type2,type3,crtdate,crttime,crtuser) values ("' +
      type1 + '","' +
      type2 + '","' +
      type3 + '","' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/**************** add dept ******************/
exports.addDept = function (department, office, produce, team, crtdate, crttime, crtuser, callback) {
  var sql = 'insert into dept (department,office,produce,team,crtdate,crttime,crtuser) values("' +
      department + '","' +
      office + '","' +
      produce + '","' +
      team + '","' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};