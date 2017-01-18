var express = require('express');
var router = express.Router();
var dbSelect = require('../db/dbSelect.js');
var dbInsert = require('../db/dbInsert.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  dbSelect.getAdmins(function(err,rows,fields){
    if(err){
      throw err;
    }else{
      res.render('index',{
        title: rows[1].adminname
      });
    }
  });
});

module.exports = router;
