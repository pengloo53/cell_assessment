/**
 * Created by 118663 on 2017/2/7.
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
router.use(function (req, res, next) {
  var adminType = req.session.adminInfo.type;
  if (adminType != 'sys') {
    res.send('您没有权限操作');
  } else {
    next();
  }
});
/************************ 系统管理员 ***********************/
// 考核员管理页面
router.get('/admins', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.render('admin-admins', {
        title: '考核员管理',
        info: rows[0]
      });
    }
  });
});
// bootstrap-table - 考核员列表json
router.get('/admins/ajax/table', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminsBySys(adminid, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      errHandle(res, 'db return err', err);
    }
  });
});
// ajax - 删除考核员
router.post('/admins/ajax/del', function (req, res, next) {
  var adminid = req.body.id;
  dbDelete.delAdmin(adminid, function (err, rows, fields) {
    if (!err) {
      res.send('删除成功');
    } else {
      errHandle(res, 'db return err', err);
    }
  });
});
// ajax - 重置密码
router.post('/admins/ajax/reset', function(req,res,next){
  var adminid = req.body.adminid;
  var aid = req.body.aid;
  dbUpdate.resetPassword(aid,adminid,function(err,rows,fields){
    if(!err){
      res.send('重置成功，密码为员工号');
    }else{
      errHandle(res,'resetPassword return err',err);
    }
  });
});
// ajax - 添加考核员
router.post('/admins/ajax/add', function (req, res, next) {
  var adminid = req.body.adminid;
  var adminname = req.body.adminname;
  var now = new Date();
  var crtdate = myUtil.getDate(now);
  var crttime = myUtil.getTime(now);
  var crtuser = req.session.adminInfo.adminid;
  var department = req.body.department;
  var office = req.body.office;
  var produce = req.body.produce;
  var team = req.body.team;
  var password = adminid;
  var type = 'admin';
  dbInsert.addAdmin(adminid, adminname, department, office, produce, team, password, type, crtdate, crttime, crtuser, function (err, rows, fields) {
    if (!err) {
      res.send('添加成功');
    }else if(err.code == 'ER_DUP_ENTRY'){ // 主键重复
      dbSelect.getAdminInfo(adminid, function(err,rows,fields){
        if(!err && rows[0].dmark == "x"){
          dbUpdate.addDelAdmin(adminid,adminname,department, office, produce, team, function(err,rows,fields){
            if(!err){
              res.send('添加成功');
            }else{
              errHandle(res,'db "addDelAdmin" return err', err);
            }
          });
        }else{
          res.send('该考核员已经存在');
        }
      });
    }else{
      errHandle(res,'addAdmin return err', err);
    }
  });
});
// ajax - Get office by department
router.get('/admins/ajax/getOffice' , function(req,res,next){
  var department = req.query.department;
  dbSelect.getOfficeByDpt(department,function(err,rows,fields){
    if(!err){
      res.send(rows);
    }else{
      errHandle(res,'getOfficeByDpt return err', err)
    }
  });
});
// ajax - Get produce by department and office
router.get('/admins/ajax/getProduce', function(req,res,next){
  var department = req.query.department;
  var office = req.query.office;
  dbSelect.getProduceByDptAndOffice(department,office,function(err,rows,fields){
    if(!err){
      res.send(rows);
    }else{
      errHandle(res,'getProduceByDptAndOffice return err', err)
    }
  });
});
// ajax - Get team by department and office and produce
router.get('/admins/ajax/getTeam', function(req,res,next){
  var department = req.query.department;
  var office = req.query.office;
  var produce = req.query.produce;
  dbSelect.getTeamByDptAndOfficeAndProduce(department,office,produce,function(err,rows,fields){
    if(!err){
      res.send(rows);
    }else{
      errHandle(res,'getTeamByDptAndOfficeAndProduce return err', err)
    }
  });
});

// 班次管理
router.get('/depts', function (req, res, next) {
  res.send('敬请期待...');
});

// 评分类型管理
router.get('/types', function (req, res, next) {
  res.send('敬请期待...');
});
/************************ 系统管理员 ***********************/

module.exports = router;