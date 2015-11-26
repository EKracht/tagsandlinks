'use strict';

var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');
var Link = require('../models/link');
var mongoose = require('mongoose');

router.get('/', function(req, res){
  Tag.find({}, function(err, foundTags){
    if (err) return res.status(400).send(err);
    Link.find({}, function(err, foundLinks){
      if (err) return res.status(400).send(err);
      var object = {};
      foundTags.forEach(function(tag){
        var name = tag.name;
        object[name] = 0;
        return foundLinks.map(function(link){
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
  var obj = { name: req.body.name };
  Tag.findOne({name: obj.name}, function(err, foundTag){
    if (err) return res.status(400).send("freaky error");
    if (foundTag) return res.status(200).send(foundTag);//"Tag already exists");

    var tag = new Tag(obj);
    tag.save(function(err){
      res.status(err ? 400 : 200).send(err || tag);
    });
  });
});

router.post('/add/:newTagName/:oldTagId/:linkId', function(req, res){
  var newTagName = req.params.newTagName;
  var linkId = req.params.linkId;
  var oldTagId = req.params.oldTagId;
  Tag.findOne({name: newTagName}, function(err, foundTag){
    if (err) return res.status(400).send(err);
    var tag;
    if(!foundTag) {
      foundTag = new Tag({ name: newTagName });
      foundTag.save(function(err){
        if (err) return res.status(400).send(err);
      });
    }
    Link.findById({_id: linkId}, function(err, foundLink){
      if (err) return res.status(400).send(err);

      if (foundLink.tagList.indexOf(foundTag._id) != -1) {
        return res.status(400).send("Tag already added");
      }
      var i = foundLink.tagList.indexOf(oldTagId);
      if (i == -1) {
        return res.status(400).send("Old tag not found");
      }
      foundLink.tagList.splice(i,1);
      foundLink.tagList.push(foundTag._id);
      foundLink.save(function(err){
        res.status(err ? 400 : 200).send(err || "Old tag deleted and new tag added to link");
      });
    });
  });
});

router.post('/edit/:id', function(req, res){
  Tag.findByIdAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}}, function(err, tag){
    res.status(err ? 400 : 200).send(err || 'tag updated')
  });
});

router.delete('/delete/:name', function(req, res){
  var tagName = req.params.name;
  Tag.findOne({name: tagName}, function(err, dbTag){
    if (err || !dbTag) return res.status(400).send(err || "Tag doesn't exist");
    Link.find({}).populate("tagList").exec(function(err, dbLinks){
      if (err) return res.status(400).send(err);
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

router.get('/:name', function(req, res){
  var tagName = req.params.name;
  Tag.find({name:tagName}, function(err, foundTag){
    if (err) return res.status(400).send(err);
    var tagId = foundTag[0]._id;
    Link.find({}, function(err, foundLinks){
      if (err) return res.status(400).send(err);

      var listLinks = [];
      foundLinks.forEach(function(link){
        if (link.tagList.indexOf(tagId) != -1) {
          listLinks.push(link);
        }
      });
      res.status(200).send(listLinks);
    });
  });
});

module.exports = router;






