/**
 * Created by isaelemoigne on 21/03/2017.
 */
routeApp.controller("myProjectsController",["$routeParams",function($routeParams){
    this.content1 = "Ceci est la page d'accueil";
    this.params = $routeParams;
}]);