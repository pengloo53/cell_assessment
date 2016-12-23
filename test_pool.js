/**
 * Created by 118663 on 2016/12/23.
 */


var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'lupeng',
  password: '080910',
  database: 'requirement',
  connectionLimit: 5
});

var startTime = new Date().getTime();

function excuteSQL1() {
  pool.query('select * from message', function (err, rows, fields) {
    if (!err) {
      console.log(rows[0].title);
    }
  });
}

function excuteSQL2(){
  pool.getConnection(function (err, connection) {
    connection.query('select * from message', function (err, rows, fields) {
      connection.release();
      if (!err) {
        console.log(rows[0].title);
      }
      connection.query('select * from message',function(err,rows,fields){
        console.log(rows[1].title);
      });
    });
  });
}

pool.on('connection', function () {
  console.log('start a connection from pool');
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

for (var i = 0; i < 6; i++) {
  excuteSQL1();
}

