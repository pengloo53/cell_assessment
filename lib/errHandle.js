/**
 * Created by 118663 on 2017/1/24.
 */

function errHandle(res,message,error){
  res.render('error',{
    message: message,
    error: error
  });
}

module.exports = errHandle;