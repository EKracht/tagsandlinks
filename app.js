'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/tagsandlinks';
var mongoose = require('mongoose');
mongoose.connect(mongoUrl)

var app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));
app.use('/tags', require('./routes/tags'));
app.use('/links', require('./routes/links'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

//Listen
app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});








