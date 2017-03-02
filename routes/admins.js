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
    var adminid = req.session.adminInfo.adminid;
    var adminname = req.session.adminInfo.adminname;
    next();
  } else {
    res.redirect('/login');
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
        title: '员工考核',
        info: rows[0]
      });
    }
  });
});
// Ajax-根据员工号或者姓名获取员工信息
router.get('/ass/ajax/user', function (req, res, next) {
  var searchVal = req.query.searchVal.trim();
  var adminid = req.session.adminInfo.adminid;
  var type = req.session.adminInfo.type;
  if(type == 'admin'){
    dbSelect.getUserInfoFromAdmin(searchVal,adminid,function(err,rows,fields){
      if(err){
        errHandle(res,'getUserInfoFromAdmin return err',err);
      }else{
        res.json(rows);
      }
    });
  }else{
    dbSelect.getUserInfoFromSys(searchVal,adminid, function (err, rows, fields) {
      if (err) {
        errHandle(res, 'getUserInfoFromSys return err', err);
      } else {
        res.json(rows);
      }
    });
  }
});

// Ajax-根据type1获取type2
router.get('/ass/ajax/type2', function (req, res, next) {
  var type1 = req.query.type1;
  dbSelect.getType2ByType1(type1, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.json(rows);
    }
  });
});

// Ajax-根据type1,type2获取type3
router.get('/ass/ajax/type3', function (req, res, next) {
  var type1 = req.query.type1;
  var type2 = req.query.type2;
  dbSelect.getType3ByType12(type1, type2, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      res.json(rows);
    }
  });
});

// 考核提交
router.post('/ass', function (req, res, next) {
  var userid = req.body.userid.trim();
  var score = req.body.score.trim();
  var type1 = req.body.type1;
  var type2 = req.body.type2;
  var type3 = req.body.type3;
  var scoredate = req.body.scoredate.trim();
  var crtdate = myUtil.getDate(new Date());
  var crttime = myUtil.getTime(new Date());
  var crtuser = req.session.adminInfo.adminid;
  if (userid && score && type1 && type2 && type3 && scoredate) {
    dbInsert.addLog(userid, type1, type2, type3, score, scoredate, crtdate, crttime, crtuser, function (err, rows, fields) {
      if (err) {
        errHandle(res, 'db return err', err);
      } else {
        res.send('添加成功.');
      }
    });
  } else {
    res.send('请填写完整');
  }
});

// 人员管理
router.get('/staff', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      // console.log(rows);
      res.render('admin-staff', {
        title: '人员管理',
        info: rows[0]
      });
    }
  });
});

// 人员管理-ajax返回bootstrap-table数据
router.get('/staff/ajax/table', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  var adminType = req.session.adminInfo.type;
  if (adminType != 'admin') {
    dbSelect.getUsersBySysNoPage(adminid, function (err, rows, fields) {
      if (!err) {
        res.json(rows);
      } else {
        errHandle(res, 'db return err', err);
      }
    });
  } else {
    dbSelect.getUsersByAdminNoPage(adminid, function (err, rows, fields) {
      if (!err) {
        res.json(rows);
      } else {
        errHandle(res, 'db return err', err);
      }
    });
  }
});
// ajax 删除人员
router.post('/staff/ajax/delStaff', function (req, res, next) {
  var userid = req.body.id;
  dbDelete.delUser(userid, function (err, rows, fields) {
    if (!err) {
      res.send('删除成功.');
    } else {
      errHandle(res, 'db return err', err);
    }
  });
});
// ajax 更改人员信息
router.post('/staff/ajax/editStaff', function (req, res, next) {
  var userid = req.body.id;
  // var
});
// ajax 添加人员信息
router.post('/staff/ajax/addStaff', function (req, res, next) {
  var userid = req.body.userid;
  var username = req.body.username;
  var now = new Date();
  var crtdate = myUtil.getDate(now);
  var crttime = myUtil.getTime(now);
  var crtuser = req.session.adminInfo.adminid;
  var did = req.session.adminInfo.did;
  dbInsert.addUserByDid(userid, username, did, crtdate, crttime, crtuser, function (err, rows, fields) {
    if (!err) {
      res.send('添加成功');
    } else if (err.code == 'ER_DUP_ENTRY') {  // 主键不允许重复数据
      dbSelect.getUserInfo(userid, function (err, rows, fields) {
        if (!err && rows[0].dmark == 'x') {
          dbUpdate.addDelUser(userid, username, function (err, rows, fields) {
            res.send('添加成功');
          });
        } else {
          res.send('已存在该员工，不能重复添加');
        }
      });
    } else {
      errHandle(res, 'addUserByDid return err', err);
    }
  });
});
// ajax 系统管理员添加人员信息
router.post('/staff/ajax/addStaffBySys', function (req, res, next) {
  var userid = req.body.userid;
  var username = req.body.username;
  var now = new Date();
  var crtdate = myUtil.getDate(now);
  var crttime = myUtil.getTime(now);
  var crtuser = req.session.adminInfo.adminid;
  var department = req.session.adminInfo.department;
  var office = req.body.office;
  var produce = req.body.produce;
  var team = req.body.team;
  dbInsert.addUser(userid, username, department,office,produce,team, crtdate, crttime, crtuser, function (err, rows, fields) {
    if (!err) {
      res.send('添加成功');
    } else if (err.code == 'ER_DUP_ENTRY') {  // 主键不允许重复数据
      dbSelect.getUserInfo(userid, function (err, rows, fields) {
        if (!err && rows[0].dmark == 'x') {
          dbUpdate.addDelUserBySys(userid, username,department,office,produce,team, function (err, rows, fields) {
            res.send('添加成功');
          });
        } else {
          res.send('已存在该员工，不能重复添加');
        }
      });
    } else {
      errHandle(res, 'addUserByDid return err', err);
    }
  });
});

// ajax - 修改密码
router.post('/admins/ajax/modPassword', function(req,res,next){
  var password = req.body.password;
  var aid = req.body.aid;
  dbUpdate.modPassword(aid, password, function(err,rows,fields){
    if(!err){
      res.send('密码修改成功');
    }else{
      errHandle(res,'modPassword return err', err);
    }
  });
});

// 统计页面-个人LOG
router.get('/stat/person', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      // console.log(rows);
      res.render('admin-stat-person', {
        title: '个人记录报表',
        info: rows[0]
      });
    }
  });
});
// 个人Log - Bootstrap table json
router.get('/stat/person/table', function(req,res,next){
  var adminid = req.session.adminInfo.adminid;
  var type = req.session.adminInfo.type;
  var now = new Date();
  var now1 = new Date(now.getFullYear(),now.getMonth()+1,0);
  var firstDay = myUtil.getDate(now).substring(0,6) + '01';
  var lastDay = myUtil.getDate(now).substring(0,6) + '' + now1.getDate();
  var scoredate1 = req.query.scoredate1 || firstDay;
  var scoredate2 = req.query.scoredate2 || lastDay;
  if(type != 'admin'){
    dbSelect.getLogBySysNoPage(adminid,scoredate1,scoredate2,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getLogBySysNoPage return err', err);
      }
    });
  }else{
    dbSelect.getLogByAdminNoPage(adminid,scoredate1,scoredate2,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getLogByAdminNoPage return err', err);
      }
    });
  }
});
// 个人Log 删除
router.post('/stat/person/del', function(req,res,next){
  var lid = req.body.id;
  dbDelete.delLog(lid, function(err,rows,fields){
    if(!err){
      res.send('成功删除个人记录');
    }else{
      errHandle(res,'delLog return err',err);
    }
  });
});

// 统计页面-个人统计
router.get('/stat/sum', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      // console.log(rows);
      res.render('admin-stat-sum', {
        title: '统计报表',
        info: rows[0]
      });
    }
  });
});
// 个人统计sum - bootstrap table
router.get('/stat/sum/table', function(req,res,next){
  var adminid = req.session.adminInfo.adminid;
  var type = req.session.adminInfo.type;
  var now = new Date();
  var month = myUtil.getDate(now).substring(0,6); // 当月，如：201702
  var scoredate = req.query.scoredate || month;
  if(type == 'admin'){
    dbSelect.getSumByAdmin(adminid,scoredate,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getSumByAdmin return err',err);
      }
    });
  }else{
    dbSelect.getSumBySys(adminid,scoredate,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getSumBySys return err',err);
      }
    });
  }
});

// 统计页面-类型统计
router.get('/stat/type', function (req, res, next) {
  var adminid = req.session.adminInfo.adminid;
  dbSelect.getAdminInfo(adminid, function (err, rows, fields) {
    if (err) {
      errHandle(res, 'db return err', err);
    } else {
      // console.log(rows);
      res.render('admin-stat-type', {
        title: '减分占比报表',
        info: rows[0]
      });
    }
  });
});

// 类型统计 - bootstrap table
router.get('/stat/type/table', function(req,res,next){
  var type = req.session.adminInfo.type;
  var department = req.session.adminInfo.department;
  var now = new Date();
  var month = myUtil.getDate(now).substring(0,6); // 当月，如：201702
  var scoredate = req.query.scoredate || month;
  if(type == 'admin'){
    var did = req.session.adminInfo.did;
    dbSelect.getMinusCountByDid(did,scoredate,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getMinusCountByDid return err',err);
      }
    });
  }else{
    var office = req.query.office;
    var produce = req.query.produce;
    var team = req.query.team;
    dbSelect.getMinusCountByDpt(department,office,produce,team,scoredate,function(err,rows,fields){
      if(!err){
        res.json(rows);
      }else{
        errHandle(res,'getMinusCountByDpt return err',err);
      }
    });
  }
});



module.exports = router;
