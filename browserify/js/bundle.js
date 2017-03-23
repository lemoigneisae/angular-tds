(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
angular.module("App", ['ngRoute',require("./app2")]);
angular.module("App").controller("App1Controller", ["$scope",require("./controller1")]);
angular.module("App").directive("dirClient",require("./directives"));
angular.module("App").config(["$routeProvider",require("./routes")]);
},{"./app2":2,"./controller1":3,"./directives":5,"./routes":6}],2:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
angular.module("App2", []);
angular.module("App2").controller("App2Controller", ["$scope",require("./controller2")]);
module.exports=angular.module("App2").name;
},{"./controller2":4}],3:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
module.exports=function($scope) {
    $scope.client="Dupond";
};
},{}],4:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
module.exports=function($scope) {
    $scope.client="Durand";
};
},{}],5:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
module.exports=function() {
    return {
        template : "<div>Client : {{client}}</div>"
    };
};
},{}],6:[function(require,module,exports){
/**
 * Created by isaelemoigne on 07/03/2017.
 */
module.exports=function($routeProvider) {
    $routeProvider.when('/page1', {
        controller: 'App1Controller',
        templateUrl: 'templates/main.html'
    }).when('/page2', {
        controller: 'App2Controller',
        templateUrl: 'templates/main.html'
    }).otherwise({
        redirectTo: '/page1'
    });
};
},{}]},{},[1]);
