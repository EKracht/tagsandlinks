'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag;

var tagSchema = mongoose.Schema({
  name: {type: String, required: true},
});


Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;










