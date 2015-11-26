'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Link; 

var linkSchema = Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  tagList: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Tag' }]
});

Link = mongoose.model('Link', linkSchema);
module.exports = Link;





