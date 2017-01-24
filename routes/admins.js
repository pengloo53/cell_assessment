/**
 * Created by 118663 on 2017/1/5.
 * admin page
 */

var express = require('express');
var router = express.Router();
var dbSelect = require('../db/dbSelect.js');
var dbInsert = require('../db/dbInsert.js');
var dbDelete = require('../db/dbDelete.js');
var dbUpdate = require('../db/dbUpdate.js');

// 权限过滤：需要登陆账号，密码才能进入后台管理页面
router.use(function (req, res, next) {
  if (req.session && req.session.adminInfo) {
    next();
  } else {
    res.redirect('/login');
  }
});

// 属于系统管理员的操作权限控制
router.use('/sys', function(req,res,next){
  var adminid = req.session.adminInfo.adminid;
  var adminType = req.session.adminInfo.type;
  if(adminType != 'sys'){
    res.send('您没有权限操作');
  }
});

// 管理员首页-员工考核页面
router.get('/', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.render('admin', {
        title: '后台考核页面',
        info: rows[0]
      });
    }
  });
});

// 人员管理
router.get('/staff',function(req,res,next){

});

// 统计页面-初始
/*router.get('/sta',function(req,res,next){

});*/

// 统计页面-个人LOG
router.get('/sta/person',function(req,res,next){

});

// 统计页面-个人统计
router.get('/sta/all',function(req,res,next){

});

// 统计页面-类型统计
router.get('/sta/type',function(req,res,next){

});

// 测试方法
router.get('/test', function (req, res, next) {
  dbInsert.addUser('120820', '孙莉', 'B1', 'B1', 'B1', 'B1', new Date().getFullYear(), new Date().getTime(), 'sys', function (err, rows, field) {
    if (err) {
      res.render('error', {
        message: err,
        error: {
          status: err.code,  //ER_DUP_ENTRY 重复数据
          stack: null
        }
      });
    } else {
      res.send('Success');
    }
  });
});

module.exports = router;
