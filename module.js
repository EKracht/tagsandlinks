'use strict';

var app = angular.module('app', ["ui.router", "xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html",
      controller: "HomeCtrl"
    })
    .state('tagList', {
      url: "/tags",
      templateUrl: "partials/tagList.html",
      controller: "TagListCtrl"
    })
    .state('eachTagList', {
      url: "/tags/:name",
      templateUrl: "partials/eachtaglist.html",
      controller: "EachTagListCtrl"
    })
    .state('newLink', {
      url: "/new",
      templateUrl: "partials/newLink.html",
      controller: "NewLinkCtrl"
    });

  $urlRouterProvider.otherwise("/home");
});

app.controller("HomeCtrl", function($scope, $http) {
  var savedTag = "";
  $scope.tagId = "";
  $scope.linkId = "";
  var currInput = {};

  $http.get("http://localhost:3000/links")
    .then(function(resp) { 
      console.log(resp);
      $scope.homeLinks = resp.data;
    });

  $scope.editTagFromLink = function(tagName, tagId, linkId) {
    savedTag = tagName;
    $scope.inputTag = tagName;
    $scope.tagId = tagId;
    $scope.linkId = linkId;
    //console.log(tagId, linkId);
  };

  $scope.$watch('inputTag', function(newVal, oldVal){
    currInput = newVal;
    console.log('watch',currInput, newVal, oldVal);
  }, true);

  $scope.saveTagFromLink = function(tagName, tagId, linkId) {
    console.log(tagId, linkId);
    console.log(savedTag, currInput);
    console.log(tagName);
    if(savedTag == currInput) {
      //don't do anything
    } else {
      $http.post('http://localhost:3000/tags/add/' + tagId + '/' + linkId)
      .then(function(resp){
        console.log(resp);
        $scope.tagName = $scope.inputTag;

      })
      .catch(function(resp){
        console.log(resp);
      });
      //look in db
      //if found, just reassign tag
      //if not found, make the tag and put into tagList for this link
      //need linkId, tagname
    }
    //$scope.tagName = "";
    $scope.tagId = "";
    $scope.linkId = "";
  };

  $scope.delTagFromLink = function(name) {
    $http.delete("http://localhost:3000/links/delete/" + name)
    .then(function(resp){
      console.log('homectrl delete tags/delete', resp);
      //update tags here
      $http.get("http://localhost:3000/links")
      .then(function(resp2) { 
        console.log(resp2.data);
        $scope.tags = resp2.data;
      })
      .catch(function(resp2){
        console.log('get ERROR', resp2);
      });

    })
    .catch(function(resp){
      console.log('homectrl delete tags/delete ERROR', resp);
    });
  };

});

app.controller("TagListCtrl", function($scope, $http) {

  $http.get("http://localhost:3000/tags")
    .then(function(resp) { 
      console.log(resp.data);
      $scope.tags = resp.data;
    })
    .catch(function(resp){
      console.log('get ERROR', resp);
    });

  $scope.deleteTag = function(name) {
    $http.delete("http://localhost:3000/tags/delete/" + name)
    .then(function(resp){
      console.log('taglistctrl delete tags/delete', resp);
      //update tags here
      $http.get("http://localhost:3000/tags")
      .then(function(resp2) { 
        console.log(resp2.data);
        $scope.tags = resp2.data;
      })
      .catch(function(resp2){
        console.log('get ERROR', resp2);
      });

    })
    .catch(function(resp){
      console.log('taglistctrl delete tags/delete ERROR', resp);
    });
  };
});

app.controller("EachTagListCtrl", function($scope, $stateParams, $http) {
  $scope.tagName = $stateParams.name;
  $http.get("http://localhost:3000/tags/" + $stateParams.name)
    .then(function(resp) { 
      console.log('inside ang ctrl', resp.data);
      $scope.links = resp.data;
    });
});


app.controller("NewLinkCtrl", function($scope, $http) {
  var tagList = [];
  var tagName = [];
  console.log("newlinkctrl");

  $scope.addTag = function() {
    console.log('addtag');
    //grab from input
    // var tag = {};
    // tag.name = $scope.tag;
    //look in database
    $http.post('http://localhost:3000/tags/add', { name: $scope.tag })
    .then(function(resp){
      console.log('inside NewLinkCtrl tags/add', resp);
      tagList.push(resp.data._id);
      tagName.push(resp.data.name);
      $scope.tagNames = tagName;
      console.log(tagList);

    })
    .catch(function(resp){
      console.log(resp);
    });
    //if found, append the tag to the page
    //if not found, add to database, then append the tag to page
    //then hook it up to the 'tags' model
  };

  $scope.submit = function() {
    // console.log('submit');
    var obj = {};
    obj.title = $scope.title;
    obj.url = $scope.url;
    obj.tagList = tagList;
    console.log('obj/taglist in angular submit', obj);

    $http.post("http://localhost:3000/links/add", obj)
    .then(function(resp) { 
      console.log(resp);
      $scope.title = "";
      $scope.url = "";
      $scope.tag = "";
      $scope.tagNames = "";
      alert(resp.data);
    });
  };
});



















// 
// app.controller("ResidentCtrl", function($scope, $stateParams, swSvc) {
//   swSvc.getResident($stateParams.id, function(data){
//     $scope.character = data;
//   });  
// })

// app.controller("PlanetCtrl", function($scope, swSvc) {
//   swSvc.getPlanets(function(data){ 
//     if(!data) { 
//       $scope.planets = {}; 
//       return; 
//     }
//     $scope.planets = data;
//     $scope.visited = swSvc.residents;
//   });
// });

// //====================== service =================================

// app.service('swSvc', function($http){
//   this.residents = {};
//   this.planets = [];
//   this.url = "http://swapi.co/api/";

//   this.getResident = function(id, cb) {
//     var thatRes = this.residents;
//     if (thatRes[id]) {
//       console.log('inside service: got before (no ajax)');
//       return cb(thatRes[id]);
//     }
//     $http.get(this.url + "people/" + id + "/?format=json")
//     .then(function(resp) { 
//       /*this.residents.id = id;
//       this.residents[id] = resp.data;*/
//       //thatRes.id = id;
//       thatRes[id] = resp.data;
//       //console.log('in service, calling ajax', this.residents); 
//       cb(thatRes[id]); 
//     });    
//   };

//   this.getPlanets = function(cb) {
//     console.log(this.planets);
//     var thatPlanets = this.planets;
//     if (thatPlanets.length) {
//       console.log('inside service: got before Planets (no ajax)');
//       return cb(thatPlanets);
//     }
//     $http.get(this.url + 'planets/?format=json')
//     .then(function(resp) {
//       //resp.data.results.forEach(function(planet) {
//       var newPlanets = resp.data.results.map(function(planet) {
//         //planet.population = planet.population === 'unknown' ? '0' : planet.population;
//         planet.residents = planet.residents.map(function(resident) {
//           var res = {};
//           res.id = resident.match(/\d+/)[0];
//           // if (this.residents[res.id]) {
//           //   res.url = this.residents[res.id].name;
//           // } else {
//             res.url = resident;
//           //}
//           return res;
//         });
//         console.log('inside getPlanets: planet- ajax', planet);
//         return planet;
//       });
//       //this.planets = newPlanets;
//       //cb(this.planets);
//       thatPlanets = newPlanets;
//       cb(thatPlanets);
//     }).catch(function(error) {
//       console.log(error);//.status);
//       cb(null);
//     });
//   };
// });