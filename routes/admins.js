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
// errHandle
var errHandle = require('../lib/errHandle.js');
// util
var myUtil = require('../lib/myUtil.js');

// 权限过滤：需要登陆账号，密码才能进入后台管理页面
router.use(function (req, res, next) {
  if (req.session && req.session.adminInfo) {
    next();
  } else {
    res.redirect('/login');
  }
});

// 属于系统管理员的操作权限控制
router.use('/sys', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  var adminType = req.session.adminInfo.type;
  if (adminType != 'sys') {
    res.send('您没有权限操作');
  }
});

// 管理员首页-员工考核页面
router.get('/', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      // console.log(rows);
      res.render('admin', {
        title: '后台考核页面',
        info: rows[0]
      });
    }
  });
});
// Ajax-根据员工号获取员工信息
router.get('/ass/ajax/user', function (req, res, next) {
  var userid = req.query.userid.trim();
  dbSelect.getUserInfo(userid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.json(rows[0]);
    }
  });
});

// Ajax-根据type1获取type2
router.get('/ass/ajax/type2',function(req,res,next){
  var type1 = req.query.type1;
  dbSelect.getType2ByType1(type1,function(err,rows,fields){
    if(err){
      errHandle(res, 'db return err',err);
    }else{
      res.json(rows);
    }
  });
});

// Ajax-根据type1,type2获取type3
router.get('/ass/ajax/type3',function(req,res,next){
  var type1 = req.query.type1;
  var type2 = req.query.type2;
  dbSelect.getType3ByType12(type1,type2,function(err,rows,fields){
    if(err){
      errHandle(res,'db return err',err);
    }else{
      res.json(rows);
    }
  });
});

// 考核提交
router.post('/ass',function(req,res,next){
  var userid = req.body.userid.trim();
  var score = req.body.score.trim();
  var type1 = req.body.type1;
  var type2 = req.body.type2;
  var type3 = req.body.type3;
  var scoredate = req.body.scoredate.trim();
  var crtdate = myUtil.getDate(new Date());
  var crttime = myUtil.getTime(new Date());
  var crtuser = req.session.adminInfo.adminid;
  if(userid && score && type1 && type2 && type3 && scoredate){
    dbInsert.addLog(userid,type1,type2,type3,score,scoredate,crtdate,crttime,crtuser,function(err,rows,fields){
      if(err){
        errHandle(res,'db return err',err);
      }else{
        res.send('add success.');
      }
    });
  }else{
    res.send('请填写完整');
  }
});

// 人员管理
router.get('/staff', function (req, res, next) {

});

// 统计页面-初始
/*router.get('/sta',function(req,res,next){

 });*/

// 统计页面-个人LOG
router.get('/sta/person', function (req, res, next) {

});

// 统计页面-个人统计
router.get('/sta/all', function (req, res, next) {

});

// 统计页面-类型统计
router.get('/sta/type', function (req, res, next) {

});

/************************ 系统管理员 ***********************/
// 考核员管理页面
router.get('/sys/admins', function (req, res, next) {

});

// 班次管理
router.get('/sys/depts', function (req, res, next) {

});

// 评分类型管理
router.get('/sys/types', function (req, res, next) {

});
/************************ 系统管理员 ***********************/

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
router.get('/:type1/:type2/:type3',function(req,res,next){
  var type1 = req.params.type1;
  var type2 = req.params.type2;
  var type3 = req.params.type3;
  dbInsert.addType(type1,type2,type3,'20170125','000000','admin',function(err,rows,fields){
    if(err){
      throw err;
    }else{
      res.send('OK');
    }
  });
});

module.exports = router;
