/**
 * Created by isaelemoigne on 21/03/2017.
 */
module.exports = function($routeProvider,$locationProvider){
    $routeProvider.
    when('/home', {
        templateUrl: 'app/views/myProjects.html',
        controller: 'myProjectsController',
        controllerAs: 'myProjectsCtrl'
    }).
    when('/project/:_id', {
        templateUrl: 'app/views/project.html',
        controller: 'projectController',
        controllerAs: 'projectCtrl'
    }).
    when('/story/:_id', {
        templateUrl: 'app/views/story.html',
        controller: 'storyController',
        controllerAs: 'storyCtrl'
    }).
    otherwise({
        redirectTo: '/home'
    });
    if(window.history && window.history.pushState){
        $locationProvider.html5Mode(true);
    }
};