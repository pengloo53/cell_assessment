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

// 考核员管理页面----------------------------------------------------
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
        console.log(rows[0]);
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
  var department = req.session.adminInfo.department;
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
  var department = req.session.adminInfo.department;
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
  var department = req.session.adminInfo.department;
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

// 组织管理-----------------------------------------------------------------
router.get('/depts', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.render('admin-depts', {
        title: '组织管理',
        info: rows[0]
      });
    }
  });
});
// bootstrap-table - 组织列表json
router.get('/depts/ajax/table', function (req, res, next) {
  var department = req.session.adminInfo.department;
  dbSelect.getDeptsByDpt(department, function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      errHandle(res, 'getDeptsByDpt return err', err);
    }
  });
});
// ajax - 删除班组
router.post('/depts/ajax/del', function(req,res,next){
  var did = req.body.id;
  dbDelete.delDept(did,function(err,rows,fields){
    if(!err){
      res.send('删除班组成功');
    }else{
      errHandle(res,'delDept return err',err);
    }
  });
});
// ajax - 添加班组
router.post('/depts/ajax/add', function(req,res,next){
  var office = req.body.office;
  var produce = req.body.produce;
  var team = req.body.team;
  var department = req.session.adminInfo.department;
  dbSelect.getDeptBy4(department,office,produce,team,function(err,rows,fields){
    if(!err){
      console.log(rows);
      if(rows.length == 0){
        var now = new Date();
        var crtdate = myUtil.getDate(now);
        var crttime = myUtil.getTime(now);
        var crtuser = req.session.adminInfo.adminid;
        dbInsert.addDept(department,office,produce,team,crtdate,crttime,crtuser,function(err,rows,fields){
          if(!err){
            res.send('添加成功');
          }else{
            errHandle(res,'addDept return err',err);
          }
        });
      }else if(rows[0].dmark == "x"){
        var did = rows[0].did;
        dbUpdate.addDelDept(did, function(err,rows,fields){
          res.send('添加成功');
        });
      }else{
        res.send('已存在该班组信息');
      }
    }else{
      errHandle(res,'getDeptBy4 return err',err);
    }
  });
});

// 评分类型管理 ---------------------------------------------------------
router.get('/types', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.render('admin-types', {
        title: '评分类型管理',
        info: rows[0]
      });
    }
  });
});
// bootstrap-table - 评分类别列表json
router.get('/types/ajax/table', function (req, res, next) {
  dbSelect.getTypes(function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      errHandle(res, 'getTypes return err', err);
    }
  });
});
// ajax - 添加type
router.post('/types/ajax/add',function(req,res,next){
  var type1 = req.body.type1;
  var type2 = req.body.type2;
  var type3 = req.body.type3;
  dbSelect.getTypeBy3(type1,type2,type3,function(err,rows,fields){
    if(!err){
      if(rows.length == 0){
        var now = new Date();
        var crtdate = myUtil.getDate(now);
        var crttime = myUtil.getTime(now);
        var crtuser = req.session.adminInfo.adminid;
        dbInsert.addType(type1,type2,type3,crtdate,crttime,crtuser,function(err,rows,fields){
          if(!err){
            res.send('添加成功');
          }else{
            errHandle(res,'addType return err',err);
          }
        });
      }else if(rows[0].dmark == "x"){
        var tid = rows[0].tid;
        dbUpdate.addDelType(tid, function(err,rows,fields){
          res.send('添加成功');
        });
      }else{
        res.send('已存在该原因，无需添加');
      }
    }else{
      errHandle(res,'getTypeBy3 return err',err);
    }
  });
});
// ajax - 删除type
router.post('/types/ajax/del',function(req,res,next){
  var tid = req.body.id;
  dbDelete.delType(tid,function(err,rows,fields){
    if(!err){
      res.send('删除原因成功');
    }else{
      errHandle(res,'delType return err', err);
    }
  });
});

module.exports = router;