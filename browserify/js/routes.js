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