'use strict';

var express = require('express');
var router = express.Router();
var Link = require('../models/link');

router.post('/add', function(req,res){
  console.log('req.body',req.body);
  Link.findOne({title: req.body.title}, function(err, foundLink){
    if (err) return res.status(400).send(err);
    if (foundLink) return res.status(400).send("Link already exists");
    var link = new Link(req.body);
    link.save(function(err){
      res.status(err ? 400 : 200).send(err || "Link added");
    });
  });
});

router.get('/', function(req, res){
  console.log('req.body', req.body);
  Link.find({}, function(err, foundLinks){
    if (err) return res.status(400).send(err);
    console.log(foundLinks);
    res.status(200).send(foundLinks);
  }).populate('tagList');
});

//   var itemId = req.params.id;
//   console.log('toggle ID: ', itemId)
//   Item.findOne({_id: itemId}, function(err,item){
//     console.log('retrieved Item: ', item)
//     if (err || !item) return res.status(200).send(err || 'no item found');
//     item.forTrade = (item.forTrade) ? false : true;
//     console.log('new toggle status:', item.forTrade)
//     item.save(function(err){
//       res.status(err ? 400 : 200).send(err || 'toggle-d')
//     })
//   })

// });


module.exports = router;





