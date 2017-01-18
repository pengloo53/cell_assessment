/**
 * Created by 118663 on 2016/12/27.
 * Database connect function.
 */

var config = require('../config.json');
var mysql = require('mysql');

var pool = mysql.createPool(config.mysql);

// 执行SQL语句
exports.querySQL = function(sql,callback){
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql,function(err,rows,fields){
        // 释放连接
        conn.release();
        // 回调返回
        callback(err,rows,fields);
      });
    }
  });
};

// 执行多条SQL - 待定
exports.queryTwoSQL = function(sql1,sql2,callback){
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null);
    }else{
      conn.query(sql1,function(err1,rows1,fields1){
        if(err){
          callback(err,null,null);
        }else{
          conn.query(sql2,function(err2,rows2,fields2){

          });
        }
      });
    }
  });
};