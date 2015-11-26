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
      res.status(err ? 400 : 200).send(err || "Link added successfully");
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










router.delete('/delete/:name', function(req, res){
  var tagName = req.params.name;
  console.log('inside link/tags/delete',tagName);
  Tag.findOne({name: tagName}, function(err, dbTag){
    if (err || !dbTag) return res.status(400).send(err || "Tag doesn't exist");
    Link.find({}).populate("tagList").exec(function(err, dbLinks){
      if (err) return res.status(400).send(err);
      console.log("delete tags:", dbLinks);
      for (var i = 0; i < dbLinks.length; i++) {
        if (dbLinks[i].tagList) {
          if (dbLinks[i].tagList.indexOf(tagName) != -1) {
            return res.status(400).send("Tag is in use. Cannot delete.");
          }
        }
      }
      Tag.remove({name: tagName}, function(err, tag){
        res.status(err ? 400 : 200).send(err || 'tag deleted')   
      });
    });
  });
});











module.exports = router;





