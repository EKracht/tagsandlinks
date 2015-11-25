'use strict'

var router = require('express').Router();
var User = require('../models/user');
var Item = require('../models/item');
var mongoose = require('mongoose');

var authMiddleWare = require('../config/auth');

router.post('/create', authMiddleWare, function(req,res){
  var item = req.body;
  item.owner = req.cookies.userId;
  console.log('saving item:', item)
  Item.create(item, function(err,item){
    res.status(err ? 400 : 200).send(err || item)
  })
})

router.put('/toggle/:id', authMiddleWare, function(req,res){
  var itemId = req.params.id;
  console.log('toggle ID: ', itemId)
  Item.findOne({_id: itemId}, function(err,item){
    console.log('retrieved Item: ', item)
    if (err || !item) return res.status(200).send(err || 'no item found');
    item.forTrade = (item.forTrade) ? false : true;
    console.log('new toggle status:', item.forTrade)
    item.save(function(err){
      res.status(err ? 400 : 200).send(err || 'toggle-d')
    })
  })
})

router.delete('/delete/:id', authMiddleWare, function(req,res){
  var itemId = req.params.id;
  Item.remove({_id: itemId}, function(err,item){
    // if (err) return res.status(200).send(err)
    res.status(err ? 400 : 200).send(err || 'item deleted')
  })
})

router.post('/addOffer/:myItem/:tradeItem', authMiddleWare, function(req, res){
  Item.addOffer(req.params.myItem, req.params.tradeItem, function(err, message){
    res.status(err ? 400 : 200).send(message)
  })
})

router.post('/reject/:myItem/:tradeItem', authMiddleWare, function(req, res){
  Item.addOffer(req.params.myItem, req.params.tradeItem, function(err, message){
    res.status(err ? 400 : 200).send(message)
  })
})

router.post('/rejectOffer/:myItemId/:offerItemId', authMiddleWare, function(req, res){
  Item.rejectOffer(req.params.myItemId, req.params.offerItemId, function(err, message){
    res.status(err ? 400 : 200).send(message)
  })
})

router.post('/accpetOffer/:myItemId/:offerItemId', authMiddleWare, function(req, res){
  Item.acceptOffer(req.params.myItemId, req.params.offerItemId, function(err, offerItem){
    res.status(err ? 400 : 200).send(offerItem)
  })
})

module.exports = router;






