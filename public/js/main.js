'use strict';

function init() {
  $('#register').click(registerUser);
  $('#login').click(loginUser);
}

function hudReg(message){
  let $message = $('#reg p');
  $message.text(message)
  $message.fadeIn();
  setTimeout(function(){$message.fadeOut()},3000)
}

function hudLog(message){
  let $message = $('#log p');
  $message.text(message)
  $message.fadeIn();
  setTimeout(function(){$message.fadeOut()},3000)
}

function registerUser(){

  let uname = $('#username').val();
  let pword = $('#password').val();
  let conf = $('#confirm').val();
  let email = $('#email').val();

  if (pword != conf) {
    hudReg('Passwords do not match.')
    return;
  }
  
  $.ajax({
    url:'/users/register',
    method:'POST',
    data: {username: uname, password:pword, email: email}
  }).done( function( data ){
    console.log(data)
    hudReg( `Account for ${data.username} created.` );
  }).fail( function( err ){
    hudReg('Error creating account')
  })

  clearForm($('.register'))

}

function loginUser(){
  let uname = $('#loginName').val();
  let pword = $('#loginPword').val();
  
  $.ajax({
    url:'/users/login',
    method:'POST',
    data: {username: uname, password:pword}
  }).done( function( data ){
    console.log(data)
    hudLog( `${data.username} is now logged in` );
    window.location.replace('/home');
  }).fail( function( err ){
    hudLog('Error logging in')
  })

  clearForm($('.login'))

}
 
function clearForm($form){
  let $inputs = $form.children('input');
  for(let i = 0; i < $inputs.length; i ++) {
    $($inputs[i]).val('');
  }
}




$(document).ready(init);
