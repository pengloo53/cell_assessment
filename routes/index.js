var express = require('express');
var router = express.Router();
var dbSelect = require('../db/dbSelect.js');
var dbInsert = require('../db/dbInsert.js');
var dbDelete = require('../db/dbDelete.js');
var dbUpdate = require('../db/dbUpdate.js');
// errHandle
var errHandle = require('../lib/errHandle.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登陆页
router.get('/login',function(req,res,next){
  res.render('login',{
    title: '考核员登陆页'
  });
});

// 登陆表单信息提交
router.post('/login',function(req,res,next){
  var adminid = req.body.adminid;
  var passwd = req.body.passwd;
  // console.log(adminid +', '+ passwd);
  if(adminid && passwd){
    dbSelect.getAdminInfo(adminid,function(err,rows,fields){
      if(!err){
        if(rows[0].password == passwd){
          req.session.adminInfo = rows[0]; // 将管理员信息保存在session中
          res.redirect('/admin');
        }else{
          res.send('密码错误');
        }
      }else{
        errHandle(res,'数据库返回错误',err);
      }
    });
  }
});

// 登出
router.get('/logout', function (req, res, next) {
  if (req.session.adminInfo) {
    req.session.adminInfo = null;
  }
  req.session.destroy();
  res.redirect('/login');
});

/* test page */
router.get('/test', function(req,res,next){
  res.render('test',{
    title: 'test page'
  });
});

module.exports = router;
