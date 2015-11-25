'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Link; 

var linkSchema = Schema({
  title: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  tagList: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Tag' }]
});

// linkSchema.statics.register = function (user,cb){
//   var username = user.username;
//   var password = user.password;
//   var email = user.email;
//   User.findOne({username: username}, function(err, dbUser){
//     if (err || dbUser) return cb(err || 'Username taken.');
//     bcrypt.genSalt(10, function(err1, salt) {
//       bcrypt.hash(password, salt, function(err2, hash) {
//         if (err1 || err2) return cb(err1 || err2);
//         var newUser = new User();
//         newUser.username = username;
//         newUser.password = hash;
//         newUser.email = email;
//         newUser.save(function(err, savedUser){
//           if (err) return (cb(err))
//           savedUser.password = null;

//           cb(err, savedUser);
//         });
//       });
//     });
//   })
// }

// userSchema.statics.authenticate = function(inputUser,cb){
//   User.findOne({username: inputUser.username}, function(err, dbUser){
//     if (err || !dbUser) return cb(err || 'Incorrect username or password')
//     bcrypt.compare(inputUser.password,dbUser.password, function(err, isGood){
//       if (err || !isGood) return cb('Incorrect username or password');

//       dbUser.password = null;

//       cb(null, dbUser)
//     }) 
//   })
// }


Link = mongoose.model('Link', linkSchema);
module.exports = Link;





