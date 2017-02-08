/**
 * Created by 118663 on 2017/1/5.
 * DB handle : update data
 */

var connect = require('./connect.js');

/****************** user table ********************/
// 根据id修改user信息
exports.modUserById = function (id, callback) {
  // var sql = 'update user set '
};

exports.addDelUser = function (userid, username, callback) {
  var sql = 'update user set dmark = "" , username = "' + username + '" ' +
      'where userid = ' + userid;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};


/******************* admin table ******************/
exports.addDelAdmin = function (adminid, adminname, department, office, produce, team, callback) {
  var sql = 'update admin set dmark = "" , adminname = "' + adminname + '", ' +
      'did=(select did from dept where department = "' + department + '" ' +
      'and office= "' + office + '" ' +
      'and produce = "' + produce + '" ' +
      'and team="' + team + '") ' +
      'where aid = ' + adminid;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 重置密码
exports.resetPassword = function (aid, adminid, callback) {
  var sql = 'update admin set password = "' + adminid + '" where aid = ' + aid;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 修改密码
exports.modPassword = function (aid, password, callback) {
  var sql = 'update admin set password = "' + password + '" where aid = ' + aid;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

