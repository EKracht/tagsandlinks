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
  var obj = { name: req.body.name };
  console.log('req.body', obj);
  console.log('inside post tags/add', obj.name);

  Tag.findOne({name: obj.name}, function(err, foundTag){
    console.log('inside post tags/add foundTag:',foundTag);
    if (err) {
      console.log('inside post tags/add err here'); 
      return res.status(400).send("freaky error");
    }
    if (foundTag) {
      console.log('inside post tags/add ft here');
      return res.status(200).send(foundTag);//"Tag already exists");
    }
    console.log('inside post tags/add wow got here');
    var tag = new Tag(obj);
    console.log(tag);
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

router.delete('/delete/:name', function(req, res){
  var tagName = req.params.name;
  console.log('inside tags/delete',tagName);
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

router.get('/:name', function(req, res){
  var tagName = req.params.name;
  //console.log(tagName);
  Tag.find({name:tagName}, function(err, foundTag){
    if (err) return res.status(400).send(err);
    //console.log('foundTag:', foundTag);
    var tagId = foundTag[0]._id;
    //console.log(tagId);
    Link.find({}, function(err, foundLinks){
      //console.log('foundLinks:', foundLinks);
      if (err) return res.status(400).send(err);

      var listLinks = [];
      foundLinks.forEach(function(link){
        if (link.tagList.indexOf(tagId) != -1) {
          listLinks.push(link);
        }
      });
      //console.log('inside get /tags/:name',listLinks);
      res.status(200).send(listLinks);
    });
  });
});

module.exports = router;






