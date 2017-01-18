/**
 * Created by 118663 on 2016/12/27.
 * handle disconnect mysql server.
 */

var mysql = require('mysql');
var config = require('../config.json');
var connection;
var isConn;
/* 断线重连 */
function handleDisconnect() {
  return function handleDisconnect(req, res, next) {
    connection = mysql.createConnection(config.mysql);
    connection.connect(function (err) {
      if (err) {
        console.log("进行断线重连：" + new Date());
        setTimeout(handleDisconnect, 2000);
      } else {
        console.log("数据库连接正常");
        next();
      }
    });
    connection.on('error', function (err) {
      console.log('db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  };
}

module.exports = handleDisconnect;