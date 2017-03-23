/**
 * Created by isaelemoigne on 24/01/2017.
 */
var myApp = angular.module('ex1');

myApp.controller('ControlApp', function(){
    this.nb = 100;
    this.message='';
    var self = this;

    this.count = function() {
        self.nb = 100 - self.message.length;
        if(self.nb<100){
            self.info='Note modifié';
        }
        else{self.info='';}
    }

    this.save = function() {
        if(self.nb<100){
            self.info = 'Note sauvegardée';
        }
    }

    this.clear = function() {
        self.message='';
        self.info ='';
        self.nb=100;
    }

});