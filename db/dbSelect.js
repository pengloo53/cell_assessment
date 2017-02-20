/**
 * Created by 118663 on 2016/12/27.
 * DB handle , Select sql
 */

var connect = require('./connect.js');

/********************* user table ******************************/
// 获取普通员工列表
exports.getUsers = function (callback) {
  var sql = 'select * from user where dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据员工号获取单个用户信息
exports.getUserInfo = function (userid, callback) {
  var sql = 'select * from user where userid = "' + userid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据员工号以及考核员获取员工信息
exports.getUserInfoFromAdmin = function (userid, adminid, callback) {
  var sql = 'select uid, userid, username, D.department, D.office, D.produce, D.team ' +
      'from user U ' +
      'left join dept D on U.did = D.did ' +
      'left join admin A on A.did = U.did ' +
      'where U.dmark != "x" ' +
      'and D.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'and A.adminid="' + adminid + '" ' +
      'and U.userid = "' + userid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据员工号以及系统管理员获取员工信息
exports.getUserInfoFromSys = function (userid, adminid, callback) {
  var sql = 'select uid, userid, username,D1.department,D1.office,D1.produce,D1.team ' +
      'from user U ' +
      'left join dept D1 on U.did=D1.did ' +
      'left join dept D2 on D1.department=D2.department ' +
      'left join admin A on A.did=D2.did ' +
      'where U.dmark != "x" ' +
      'and D1.dmark != "x" ' +
      'and D2.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'and A.adminid="' + adminid + '" ' +
      'and U.userid = "' + userid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据部门系统管理员获取用户列表
/*exports.getUsersBySys = function (adminid, offset, limit, sort, order, callback) {
 var sql = 'select uid, userid, username,D1.department,D1.office,D1.produce,D1.team ' +
 'from user U ' +
 'left join dept D1 on U.did=D1.did ' +
 'left join dept D2 on D1.department=D2.department ' +
 'left join admin A on A.did=D2.did ' +
 'where U.dmark != "x" ' +
 'and D1.dmark != "x" ' +
 'and D2.dmark != "x" ' +
 'and A.dmark != "x" ' +
 'and A.adminid="' + adminid + '" ' +
 'order by ' + sort + ' ' + order + ' ' +
 'limit ' + offset + ',' + limit;
 connect.querySQL(sql, function (err, rows, fields) {
 callback(err, rows, fields);
 });
 };*/
exports.getUsersBySysNoPage = function (adminid, callback) {
  var sql = 'select uid, userid, username,D1.department,D1.office,D1.produce,D1.team ' +
      'from user U ' +
      'left join dept D1 on U.did=D1.did ' +
      'left join dept D2 on D1.department=D2.department ' +
      'left join admin A on A.did=D2.did ' +
      'where U.dmark != "x" ' +
      'and D1.dmark != "x" ' +
      'and D2.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'and A.adminid="' + adminid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
/*exports.getUsersNumBySys = function (adminid, callback) {
 var sql = 'select count(*) count from user U ' +
 'left join dept D1 on U.did=D1.did ' +
 'left join dept D2 on D1.department=D2.department ' +
 'left join admin A on A.did=D2.did ' +
 'where U.dmark != "x" ' +
 'and D1.dmark != "x" ' +
 'and D2.dmark != "x" ' +
 'and A.dmark != "x" ' +
 'and A.adminid="' + adminid + '"';
 connect.querySQL(sql, function (err, rows, fields) {
 callback(err, rows, fields);
 });
 };*/

// 获取考核员的用户列表
/*exports.getUsersByAdmin = function (adminid, offset, limit, sort, order, callback) {
 var sql = 'select * from user U ' +
 'left join dept D on U.did = D.did' +
 'left join admin A on A.did = U.did ' +
 'where U.dmark != "x" ' +
 'and A.dmark != "x" ' +
 'and A.adminid="' + adminid + '" ' +
 'order by ' + sort + ' ' + order + ' ' +
 'limit ' + offset + ',' + limit;
 connect.querySQL(sql, function (err, rows, fields) {
 callback(err, rows, fields);
 });
 };*/
exports.getUsersByAdminNoPage = function (adminid, callback) {
  var sql = 'select uid, userid, username, D.department, D.office, D.produce, D.team ' +
      'from user U ' +
      'left join dept D on U.did = D.did ' +
      'left join admin A on A.did = U.did ' +
      'where U.dmark != "x" ' +
      'and D.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'and A.adminid="' + adminid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
/*exports.getUsersNumByAdmin = function (adminid, callback) {
 var sql = 'select count(*) count from user U ' +
 'left join admin A on A.did = U.did ' +
 'where U.dmark != "x" ' +
 'and A.dmark != "x" ' +
 'and A.adminid="' + adminid + '"';
 connect.querySQL(sql, function (err, rows, fields) {
 callback(err, rows, fields);
 });
 };*/

/***************************************************************/

/********************* admin table *****************************/
// 获取考核员列表
exports.getAdminsBySys = function (adminid, callback) {
  var sql = 'select A1.aid, A1.adminid, A1.adminname, D1.department,D1.office,D1.produce,D1.team ' +
      'from admin A1 ' +
      'left join dept D1 on A1.did = D1.did ' +
      'left join dept D2 on D1.department = D2.department ' +
      'left join admin A2 on A2.did = D2.did ' +
      'where A2.adminid = "' + adminid + '" ' +
      'and A1.type != "sys" ' +
      'and A1.dmark != "x" ' +
      'and D1.dmark != "x" ' +
      'and D2.dmark != "x" ' +
      'and A2.dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 根据员工号获取单个考核员信息
exports.getAdminInfo = function (adminid, callback) {
  var sql = 'select aid, A.did,adminid, password,type,adminname,department,office,produce,team, A.dmark from admin A ' +
      'left join dept D on D.did = A.did ' +
      'where adminid= "' + adminid + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/*****************************************************************/

/********************* log table ********************************/
// 获取考核员下员工log信息列表：服务器分页显示，当月
/*exports.getLog = function (adminid, scoredate1,scoredate2, sort,order,offset,limit, callback) {
 var sql = 'select * from log L' +
 'left join user U on U.userid=L.userid' +
 'left join dept D1 on U.did=D1.did' +
 'left join dept D2 on D1.department=D2.department' +
 'left join admin A on A.did=D2.did' +
 'where A.adminid="' + adminid + '" ' +
 'and L.scoredate >= "' + scoredate1 + '" ' +
 'and L.scoredate <= "' + scoredate2 + '" ' +
 'and L.dmark != "x" ' +
 'and U.dmark != "x" ' +
 'and D1.dmark != "x" ' +
 'and D2.dmark != "x" ' +
 'and A.dmark != "x" ' +
 'order by "'+ sort +' ' + order + ' ' +
 'limit ' + offset + ',' + limit;
 connect.querySQL(sql, function (err, rows, fields) {
 callback(err, rows, fields);
 });
 };*/
// 获取系统管理员下员工log信息列表：客户端分页显示，默认当月
exports.getLogBySysNoPage = function (adminid, scoredate1, scoredate2, callback) {
  var sql = 'select L.lid, L.userid, U.username,L.type1,L.type2,L.type3,L.score,L.scoredate from log L ' +
      'left join user U on U.userid=L.userid ' +
      'left join dept D1 on U.did=D1.did ' +
      'left join dept D2 on D1.department=D2.department ' +
      'left join admin A on A.did=D2.did ' +
      'where A.adminid="' + adminid + '" ' +
      'and L.scoredate >= "' + scoredate1 + '" ' +
      'and L.scoredate <= "' + scoredate2 + '" ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and D1.dmark != "x" ' +
      'and D2.dmark != "x" ' +
      'and A.dmark != "x" ';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 获取考核员下员工log信息列表：客户端分页显示，默认当月
exports.getLogByAdminNoPage = function (adminid, scoredate1, scoredate2, callback) {
  var sql = 'select L.lid, L.userid, U.username,L.type1,L.type2,L.type3,L.score,L.scoredate from log L ' +
      'left join user U on U.userid=L.userid ' +
      'left join dept D on U.did=D.did ' +
      'left join admin A on A.did=D.did ' +
      'where A.adminid="' + adminid + '" ' +
      'and L.scoredate >= "' + scoredate1 + '" ' +
      'and L.scoredate <= "' + scoredate2 + '" ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and D.dmark != "x" ' +
      'and A.dmark != "x" ';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 获取某个员工的Log信息
exports.getLogByUser = function (userid, callback) {
  var sql = 'select * from log where userid ="' + userid + '" and dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 个人sum报表 - 系统管理员：默认当月
exports.getSumBySys = function (adminid, scoredate, callback) {
  var sql = 'select L.userid,U.username,D1.office,D1.produce,D1.team,' +
      '100+SUM(score) sum,' +
      'SUM(case WHEN L.type1="加分" THEN score ELSE 0 END) plus,' +
      'SUM(case WHEN L.type1="减分" THEN score ELSE 0 END) minus ' +
      'from log L ' +
      'left join user U on U.userid=L.userid ' +
      'left join dept D1 on U.did=D1.did ' +
      'left join dept D2 on D1.department=D2.department ' +
      'left join admin A on A.did=D2.did ' +
      'where A.adminid="' + adminid + '" ' +
      'and L.scoredate like "' + scoredate + '%" ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and D1.dmark != "x" ' +
      'and D2.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'group by L.userid';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 个人sum报表 - 考核员: 默认当月
exports.getSumByAdmin = function (adminid, scoredate, callback) {
  var sql = 'select L.userid, U.username,D.office,D.produce,D.team,' +
      '100+SUM(score) sum,' +
      'SUM(case WHEN L.type1="加分" THEN score ELSE 0 END) plus,' +
      'SUM(case WHEN L.type1="减分" THEN score ELSE 0 END) minus ' +
      'from log L ' +
      'left join user U on U.userid=L.userid ' +
      'left join dept D on U.did=D.did ' +
      'left join admin A on A.did=D.did ' +
      'where A.adminid="' + adminid + '" ' +
      'and L.scoredate like "' + scoredate + '%" ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and D.dmark != "x" ' +
      'and A.dmark != "x" ' +
      'group by L.userid';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 按班组减分行数统计 - by did
exports.getMinusCountByDid = function (did, scoredate, callback) {
  var sql = 'select L.type2,count(*) count from log L ' +
      'left join user U on U.userid = L.userid ' +
      'where U.did=' + did + ' ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and L.scoredate like "' + scoredate + '%" ' +
      'and L.type1 = "减分"' +
      'group by L.type2';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 按班组减分行数统计 - by department office produce team
exports.getMinusCountByDpt = function (department, office, produce, team, scoredate, callback) {
  var sql = 'select L.type2,count(*) count from log L ' +
      'left join user U on U.userid = L.userid where U.did =' +
      '(select did from dept ' +
      'where department = "' + department + '" ' +
      'and office = "' + office + '" ' +
      'and produce = "' + produce + '" ' +
      'and team = "' + team + '") ' +
      'and L.dmark != "x" ' +
      'and U.dmark != "x" ' +
      'and L.scoredate like "' + scoredate + '%" ' +
      'and L.type1 = "减分"' +
      'group by L.type2';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
/************************************************************/

/********************* dept table ***************************/
// 根据部门获取组织列表
exports.getDeptsByDpt = function (department, callback) {
  var sql = 'select * from dept where dmark != "x" ' +
      'and department ="' + department + '" ' +
      'and office is not null';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据id获取部门信息
exports.getDeptById = function (did, callback) {
  var sql = 'select * from dept where did = ' + did;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据部门获取有哪些科室
exports.getOfficeByDpt = function (department, callback) {
  var sql = 'select distinct office from dept ' +
      'where department = "' + department + '" ' +
      'and dmark != "x" ' +
      'and office is not null';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据部门科室获取有哪些工序
exports.getProduceByDptAndOffice = function (department, office, callback) {
  var sql = 'select distinct produce from dept ' +
      'where department = "' + department + '" ' +
      'and office = "' + office + '" ' +
      'and dmark != "x" ' +
      'and produce is not null';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 根据部门科室工序获取班组信息
exports.getTeamByDptAndOfficeAndProduce = function (department, office, produce, callback) {
  var sql = 'select distinct team from dept ' +
      'where department = "' + department + '" ' +
      'and office = "' + office + '" ' +
      'and produce = "' + produce + '" ' +
      'and dmark != "x" ' +
      'and team is not null';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 判断是否存在该组织信息
exports.getDeptBy4 = function (department, office, produce, team, callback) {
  var sql = 'select * from dept ' +
      'where department = "' + department + '" ' +
      'and office = "' + office + '" ' +
      'and produce="' + produce + '" ' +
      'and team = "' + team + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/***********************************************************/

/********************* type table **************************/
// 获取类别表信息列表
exports.getTypes = function (callback) {
  var sql = 'select * from type where dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 根据id获取类别信息
exports.getTypeById = function (id, callback) {
  var sql = 'select * from type where tid = ' + id;
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  })
};

// 根据类别获取有哪些类型
exports.getType2ByType1 = function (type1, callback) {
  var sql = 'select distinct type2 from type ' +
      'where type1 = "' + type1 + '" ' +
      'and dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

// 根据类别类型获取有哪些原因
exports.getType3ByType12 = function (type1, type2, callback) {
  var sql = 'select distinct type3 from type ' +
      'where type1 = "' + type1 + '" ' +
      'and type2="' + type2 + '" ' +
      'and dmark != "x"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
// 判断是否存在该原因
exports.getTypeBy3 = function (type1, type2, type3, callback) {
  var sql = 'select * from type ' +
      'where type1 = "' + type1 + '" ' +
      'and type2 = "' + type2 + '" ' +
      'and type3 = "' + type3 + '"';
  connect.querySQL(sql, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};
/***********************************************************/

/****************** index *****************************/
// 当月汇总
exports.getIndexJsonByDid = function (did, scoredate, callback) {
  /*var sql = 'set @s = 0;' +
   'set @rownum = 0;' +
   'set @rank = 0;' +
   'select (@rownum := @rownum + 1) rownum,' +
   '(case when @s = T.s then @rank else @rank := @rownum end) rank,' +
   'T.* ' +
   'from ' +
   '(select L.userid,' +
   'U.username,' +
   '100+SUM(score) s,' +
   'SUM(case WHEN L.type1="加分" THEN score ELSE 0 END) s1,' +
   'SUM(case WHEN L.type1="减分" THEN score ELSE 0 END) s2 from log L ' +
   'left join user U on U.userid=L.userid ' +
   'left join dept D on U.did=D.did ' +
   'where U.dmark != "x" ' +
   'AND L.dmark != "x" ' +
   'AND D.dmark != "x" ' +
   'AND L.scoredate like "' + scoredate + '%" ' +
   'AND U.did = ' + did + ' ' +
   'group by L.userid order by s desc) T';*/
  var sql1 = 'select L.userid,' +
      'U.username,' +
      '100+SUM(score) s,' +
      'SUM(case WHEN L.type1="加分" THEN score ELSE 0 END) s1,' +
      'SUM(case WHEN L.type1="减分" THEN score ELSE 0 END) s2 from log L ' +
      'left join user U on U.userid=L.userid ' +
      'left join dept D on U.did=D.did ' +
      'where U.dmark != "x" ' +
      'AND L.dmark != "x" ' +
      'AND D.dmark != "x" ' +
      'AND L.scoredate like "' + scoredate + '%" ' +
      'AND U.did = ' + did + ' ' +
      'group by L.userid order by s desc';
  connect.querySQL(sql1, function (err, rows, fields) {
    callback(err, rows, fields);
  });
};

/*****************************************************/