'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Tag;

var tagSchema = mongoose.Schema({
  name: {type: String, required: true},
  // description: {type: String, required: true},
  // imgUrl: {type: String, default: 'https://www.gravatar.com/avatar/2152f0665d54a5cfe8bde11b18f91547?s=328&d=identicon&r=PG'},
  // forTrade: {type: Boolean, default: false},
  // owner: { type: mongoose.Schema.Types.ObjectId , ref: 'User' },
  // offers: [{ type: mongoose.Schema.Types.ObjectId , ref: 'Item' }]
});

// itemSchema.plugin(deepPopulate);

// itemSchema.statics.addOffer = function (myItemId, tradeItemId, cb){
//   Item.findOne({'_id': tradeItemId}, function(err,tradeItem){
//     if (err || !tradeItem) cb(err,'trade item not found');
//     Item.find({}, function(err,allItems){
//       if (err) return cb(err,'error finding all items');

//       for (var i = 0; i < allItems.length; i ++){
//         var item = allItems[i];
//         if (item.offers){
//           if (item.offers.indexOf(myItemId) != -1) {
//             return cb(null,'Item already offered')
//           }
//         }
//       }

//       tradeItem.offers.push(myItemId);
//       tradeItem.save(function(err){
//         console.log('saved correctly')
//         if (err) return cb(err,'Error saving offer');
//         cb(null,'1');
//       })
//     })  
//   })
// }

// itemSchema.statics.rejectOffer = function (itemId, offerId, cb){
//   Item.findOne({'_id': itemId}, function(err, item){
//     if (err) return cb(err,'couldnt find traded item');
//     var offerIndex = item.offers.indexOf(offerId);
//     item.offers.splice(offerIndex-1,1);
//     item.save(function(err){
//       if (err) return cb(err,'error saving item');
//       cb(null,'1')
//     })
//   })
// }

// itemSchema.statics.acceptOffer = function (itemId, offerId, cb){
//   Item.findOne({'_id': itemId}, function(err, myItem){
//     if (err) return cb(err,'couldnt find my item');
//     Item.findOne({'_id': offerId}, function(err, offerItem){
//       if (err) return cb(err,'couldnt find offer item');
//       var meId = myItem.owner;
//       myItem.owner = offerItem.owner;
//       offerItem.owner = meId;
//       myItem.offers = [];
//       myItem.forTrade = false;
//       offerItem.offers =[];
//       offerItem.forTrade = false;

//       myItem.save(function(err){
//         if (err) return cb(err,'error saving first');
//         offerItem.save(function(err){
//           if (err) return cb(err,'error saving');
//           cb(null,offerItem)
//         })
//       })
//     })
//   })
// }


Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;










