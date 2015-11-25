'use strict'

function init(){
  $('.table').on('click','.itemSelect', makeOffer)
  
}

function makeOffer(e){
  let myItem = $(e.target).data('id');
  let tradeItem = $(e.target).closest('.item').data('id');
  console.log('making post')

  $.ajax({
    url: '/items/addOffer/' + myItem + '/' + tradeItem,
    method: 'POST'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    if (data==1){
      let username = $('body').data('username');
      let itemName = $(e.target).text();
      console.log(username, itemName);
      let $div = $('<div>').addClass('off').text(username + ' : ' + itemName ) 
      $(e.target).closest('tr').find('.trade').append($div);
      
    }
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}



$(document).ready(init);