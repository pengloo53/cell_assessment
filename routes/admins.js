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

var adminType; //管理员类型

// 权限过滤：需要登陆账号，密码才能进入后台管理页面
/*router.use(function (req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
});*/

// Get全局，判断用户属于普通考核员还是系统管理员


/* GET users listing. */
router.get('/', function (req, res, next) {
  var adminid = '118663';
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
