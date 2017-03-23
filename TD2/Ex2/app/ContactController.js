/**
 * Created by isaelemoigne on 14/02/2017.
 */

var myApp = angular.module('ex2');

myApp.controller('ContactController',['$http', function($http){
    var self = this;
    this.contact = [];
    $http.get("./app/data/contact.json").then(
        function (response) {
            self.contact = response.data;
        });

    this.unContact = new Object();
    this.modif=false;
    this.resultat = [];

    this.Annuler = function(){
        self.resultat.forEach(function(item, index, object) {
            self.contact.push(item);
        });
        self.contact.forEach(function(item, index, object) {
            if (item.suppr == true) {
                item.suppr = false;
            }
        });
        self.resultat=[];
    };


    this.Ajoute = function(){
        if(self.modif!="MAJ") {
            self.unContact = new Object();
            self.modif = "ajout";
        }
    };


    this.Ajouter = function(value){
        if(value) {
            if (self.modif == "ajout") {
                self.contact.push(self.unContact);
                self.unContact = new Object();
            } else {
                self.unContact = new Object();
                self.modif = "";
            }
        }
    };



    this.Suppression = function(contact){
        self.resultat.push(contact);
        contact.suppr = true;
        console.log(contact);
    };

    this.MiseAJour = function(contact){
        self.modif="MAJ";
        console.log(contact);
        self.unContact = contact;
        console.log(self.unContact);
    };


}]);

myApp.filter('Filtre', function(){
    return function(input){

        input.forEach(function(item, index, object) {
            if (item.suppr == true) {
                object.splice(index, 1);
            }
        });

        return input;
    };
});

myApp.directive('frmContactElem', function() {
    return {
        templateUrl: './app/template/frmContact.html'
    };
});

myApp.directive('contactElem', function() {
    return {
        templateUrl: './app/template/contact.html'
    };
});