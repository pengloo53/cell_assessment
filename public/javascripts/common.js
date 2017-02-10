/**
 * Created by 118663 on 2017/2/9.
 */

$(function () {
  /* 导航激活 */
  var page = $('#page').html();
  var $liText = $('ul.nav li');
  $liText.removeClass('active');
  for (var i = 0; i < $liText.length; i++) {
    if (page == $liText[i].innerText) {
      $liText[i].setAttribute('class', 'active');
      break;
    }
  }
  /* 修改密码 */
  $('#setting').click(function () {
    $('#modPasswordModal').modal('show');
  });
  var $rePassword = $('#rePassword');
  var $newPassword = $('#newPassword');
  $('#modPasswordConfirm').click(function () {
    var rePassword = $rePassword.val().trim();
    var newPassword = $newPassword.val().trim();
    var aid = $('#aid').val();
    if (rePassword && newPassword) {
      if (rePassword == newPassword) {
        $.ajax({
          url: '/admin/admins/ajax/modPassword',
          global: false,
          method: 'POST',
          data: {
            aid: aid,
            password: rePassword
          },
          success: function (result) {
            alert(result);
            $('#modPasswordModal').modal('hide');
          }
        });
      } else {
        alert('两次输入密码不一致，请重新输入');
        $rePassword.val('');
        $newPassword.val('');
      }
    } else {
      alert('不允许为空');
    }
  });
  // 关闭modal的时候清空密码
  $('#modPasswordModal').on('hide.bs.modal', function () {
    $rePassword.val('');
    $newPassword.val('');
  });
});