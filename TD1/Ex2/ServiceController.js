/**
 * Created by isaelemoigne on 31/01/2017.
 */
var myApp = angular.module('ex2');
/**
 * Created by isaelemoigne on 31/01/2017.
 */
myApp.controller('ControlApp', function($http){
    var self = this;
    this.count = 1;
    this.letotal = 300;
    this.ckPromo = false;
    this.promoError = false;
    this.totalAvecRemise = 0;
    this.remise = 0;

    Services = [
        {
            "name": "Web Development",
            "price": 300,
            "active":true
        },

        {
            "name": "Design",
            "price": 400,
            "active":false
        },

        {
            "name": "Integration",
            "price": 250,
            "active":false
        },

        {
            "name": "Formation",
            "price": 220,
            "active":false
        }
    ];
    this.services = Services;

    this.total = function() {
        var prix = 0;
        angular.forEach(this.services, function(value, key){
            if(value.active == true)
                prix = prix+value.price;
        });
        this.letotal = prix;
    }

    this.promoExiste = function(){
        $http.get("promo.json").then(function(response) {
            self.remise = 0;
            self.totalAvecRemise = 0;
            self.promoError = true;
            angular.forEach(response.data, function(value, key){
                if(self.codePromo == key) {
                    self.remise = self.letotal*value;
                    self.totalAvecRemise = self.letotal-self.remise;
                    self.promoError = false;
                }
            });
        });
    }

    this.toggleActive = function(service) {
        this.service = service;
        if (this.service.active == true)
        {
            this.service.active = false;
            this.count--;
        }
        else {
            this.service.active = true;
            this.count++;
        }

        this.total();
    }



});