/**
 * Created by 118663 on 2017/1/5.
 * DB handle : insert data
 */

var connect = require('./connect.js');

/**************** add user ******************/
exports.addUser = function(userid,username,department,office,produce,team,crtdate,crttime,crtuser,callback){
  var sql = 'insert into user (userid,username,did,crtdate,crttime,crtuser) values ("' +
      userid + '","' +
      username + '",(select did from dept where department = "' +
      department + '" and office = "' +
      office + '" and produce = "' +
      produce +'" and team="' +
      team + '"),"' +
      crtdate + '","' +
      crttime + '","' +
      crtuser + '")';
  connect.querySQL(sql,function(err,rows,fields){
    callback(err,rows,fields);
  });
};
