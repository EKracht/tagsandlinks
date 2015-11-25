'use strict'

function init(){
  $('#logout').click(logout)
  console.log('logout loaded')
}

function logout () {
  console.log('logoutClicked!')
  $.post('/users/logout')
  .done(function(){
    window.location.replace('/');
  })
}

$(document).ready(init)