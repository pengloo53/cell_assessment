var express = require('express');
var router = express.Router();
var dbSelect = require('../db/dbSelect.js');
var dbInsert = require('../db/dbInsert.js');
var dbDelete = require('../db/dbDelete.js');
var dbUpdate = require('../db/dbUpdate.js');
// errHandle
var errHandle = require('../lib/errHandle.js');
var myUtil = require('../lib/myUtil.js');

/* GET home page. */
router.get('/p/:did', function (req, res, next) {
  var did = req.params.did;
  var day = myUtil.getDate(new Date());
  dbSelect.getDeptById(did,function(err,rows,fields){
    if(!err && rows && rows.length != 0 && rows[0].dmark != "x" && rows[0].office !== null){
      var department = rows[0].department;
      var office = rows[0].office;
      var produce = rows[0].produce;
      var team = rows[0].team;
      res.render('index', {
        title: department + '-' + office + '-' + produce + '-' + team,
        day: day,
        did: did
      });
    }else{
      next();
    }
  });
});
router.get('/json',function(req,res,next){
  var did = req.query.did;
  var scoredate = myUtil.getDate(new Date()).substring(0,6);
  dbSelect.getIndexJsonByDid(did,scoredate,function(err,rows,fields){
    if(!err){
      res.json(rows);
    }else{
      errHandle(res,'getIndexJsonByDid return err',err)
    }
  });
});

// 登陆页
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '考核员登陆页',
    message: ''
  });
});

// 登陆表单信息提交
router.post('/login', function (req, res, next) {
  var adminid = req.body.adminid;
  var passwd = req.body.passwd;
  // console.log(adminid +', '+ passwd);
  if (adminid && passwd) {
    dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
      if (!err) {
        if (rows[0].password == passwd && rows[0].dmark != "x") {
          req.session.adminInfo = rows[0]; // 将管理员信息保存在session中
          res.redirect('/admin');
        } else {
          res.render('login', {
            title: '考核员登陆页',
            message: '账号或者密码错误'
          });
        }
      } else {
        errHandle(res, 'getAdminInfo return err', err);
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

module.exports = router;
