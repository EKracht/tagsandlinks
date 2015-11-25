'use strict';

var app = angular.module('app', ["ui.router"]);

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
    // .state('linkList', {
    //   url: "/tag/:name",
    //   templateUrl: "partials/linkList.html",
    //   controller: "ResidentCtrl"
    // })
    // .state('newLink', {
    //   url: "/new",
    //   templateUrl: "partials/newLink.html",
    //   controller: "ResidentCtrl"
    // });

  $urlRouterProvider.otherwise("/home");
});

app.controller("HomeCtrl", function($scope, $http) {
  $http.get("localhost:3000/"+ "people/" + id + "/?format=json")
    .then(function(resp) { 
      /*this.residents.id = id;
      this.residents[id] = resp.data;*/
      //thatRes.id = id;
      thatRes[id] = resp.data;
      //console.log('in service, calling ajax', this.residents); 
      cb(thatRes[id]); 
    });  

});

app.controller("TagListCtrl", function($scope, $http) {
  $http.get("localhost:3000/tags")
    .then(function(resp) { 
      console.log(resp);
    });  

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