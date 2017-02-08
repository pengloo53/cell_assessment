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
  if (adminType == 'sys') {
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

// 统计页面-个人LOG
router.get('/stat/person', function (req, res, next) {
  res.send('敬请期待...');
});

// 统计页面-个人统计
router.get('/stat/sum', function (req, res, next) {
  res.send('敬请期待...');
});

// 统计页面-类型统计
router.get('/stat/type', function (req, res, next) {
  res.send('敬请期待...');
});

module.exports = router;
