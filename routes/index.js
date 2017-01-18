var express = require('express');
var router = express.Router();

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

module.exports = router;
