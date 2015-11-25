'use strict';

var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');
var Link = require('../models/link');
var mongoose = require('mongoose');

router.get('/', function(req, res){
  Tag.find({}, function(err, foundTags){
    if (err) return res.status(400).send(err);
    console.log('foundTags:', foundTags);
    Link.find({}, function(err, foundLinks){
      console.log('foundLinks:', foundLinks);
      if (err) return res.status(400).send(err);
      var object = {};
      foundTags.forEach(function(tag){
        var name = tag.name;
        object[name] = 0;
        return foundLinks.map(function(link){
          // console.log('name', name);
          if (link.tagList.indexOf(tag._id) != -1) {
            object[name]++;
          }
        });
      });
      res.status(200).send(object);
    });
  });
});

router.post('/add', function(req, res){
  console.log('req.body',req.body);
  Tag.findOne({name: req.body.name}, function(err, foundTag){
    if (err) return res.status(400).send(err);
    if (foundTag) return res.status(400).send("Tag already exists");
    var tag = new Tag(req.body);
    tag.save(function(err){
      res.status(err ? 400 : 200).send(err || tag);
    });
  });
});
// localhost:3000/tags/add/56554f9f96648dd9051ed3ad/56553b1a0d1d27f803c0a12a
router.post('/add/:tagId/:linkId', function(req, res){
  var tagId = req.params.tagId;
  var linkId = req.params.linkId;
  // console.log('req.body',req.body);
  Tag.findById({_id: tagId}, function(err, foundTag){
    if (err) return res.status(400).send(err);
    Link.findById({_id: linkId}, function(err, foundLink){
      if (err) return res.status(400).send(err);
      if (foundLink.tagList.indexOf(foundTag._id) != -1) {
        return res.status(400).send("Tag already added");
      }
      foundLink.tagList.push(foundTag._id);
      foundLink.save(function(err){
        res.status(err ? 400 : 200).send(err || "Tag added to link");
      });
    });
  });
});

router.post('/edit/:id', function(req, res){
  var tagId = req.params.id;
  Tag.findByIdAndUpdate({_id: tagId}, {$set: {name: req.body.name}}, function(err, tag){
    res.status(err ? 400 : 200).send(err || 'tag updated')
  });
});

router.delete('/delete/:id', function(req, res){
  var tagId = req.params.id;
  Tag.findById({_id: tagId}, function(err, dbTag){
    if (err || !dbTag) return res.status(400).send(err || "Tag doesn't exist");
    Link.find({}).populate("tagList").exec(function(err, dbLinks){
      if (err) return res.status(400).send(err);
      console.log("delete tags:", dbLinks);
      for (var i = 0; i < dbLinks.length; i++) {
        if (dbLinks[i].tagList) {
          if (dbLinks[i].tagList.indexOf(tagId) != -1) {
            return res.status(400).send("Tag is in use. Cannot delete.");
          }
        }
      }
      Tag.remove({_id: tagId}, function(err, tag){
        res.status(err ? 400 : 200).send(err || 'tag deleted')   
      });
    });
  });
  // Tag.findByIdAndRemove({_id: tagId}, function(err, tag){
  //   // if (err) return res.status(200).send(err)
  //   res.status(err ? 400 : 200).send(err || 'tag deleted')
  // });
});

// router.post('/create', authMiddleWare, function(req,res){
//   var item = req.body;
//   item.owner = req.cookies.userId;
//   console.log('saving item:', item)
//   Item.create(item, function(err,item){
//     res.status(err ? 400 : 200).send(err || item)
//   })
// })

// router.put('/toggle/:id', authMiddleWare, function(req,res){
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
// })

// router.delete('/delete/:id', authMiddleWare, function(req,res){
//   var itemId = req.params.id;
//   Item.remove({_id: itemId}, function(err,item){
//     // if (err) return res.status(200).send(err)
//     res.status(err ? 400 : 200).send(err || 'item deleted')
//   })
// })

// router.post('/addOffer/:myItem/:tradeItem', authMiddleWare, function(req, res){
//   Item.addOffer(req.params.myItem, req.params.tradeItem, function(err, message){
//     res.status(err ? 400 : 200).send(message)
//   })
// })

// router.post('/reject/:myItem/:tradeItem', authMiddleWare, function(req, res){
//   Item.addOffer(req.params.myItem, req.params.tradeItem, function(err, message){
//     res.status(err ? 400 : 200).send(message)
//   })
// })

// router.post('/rejectOffer/:myItemId/:offerItemId', authMiddleWare, function(req, res){
//   Item.rejectOffer(req.params.myItemId, req.params.offerItemId, function(err, message){
//     res.status(err ? 400 : 200).send(message)
//   })
// })

// router.post('/accpetOffer/:myItemId/:offerItemId', authMiddleWare, function(req, res){
//   Item.acceptOffer(req.params.myItemId, req.params.offerItemId, function(err, offerItem){
//     res.status(err ? 400 : 200).send(offerItem)
//   })
// })

module.exports = router;






