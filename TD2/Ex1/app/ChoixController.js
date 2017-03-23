/**
 * Created by isaelemoigne on 07/02/2017.
 */

myApp.controller('ChoixController', ['$http', function($http){
    var self = this;
    this.step=1;
    this.dispoItems = [];
    this.includedItems = [];
    this.selectedIncludedItems = [];
    this.selectedDispoItems = [];

    $http.get("./app/data/dispoItems.json").then(
        function (response) {
            self.dispoItems = response.data;
        });

    this.addToIncluded = function(){
        this.selectedDispoItems.forEach(function(element) {
            self.includedItems.push(element);
            a = self.dispoItems.indexOf(element);
            self.dispoItems.splice(a, 1);
        });
    }

    this.addAllToIncluded = function(){
        self.dispoItems.forEach(function(element) {
            self.includedItems.push(element);
        });
        self.dispoItems = [];
    }

    this.removeFromIncluded = function(){
        this.selectedIncludedItems.forEach(function(element) {
            self.dispoItems.push(element);
            a = self.includedItems.indexOf(element);
            self.includedItems.splice(a, 1);
        });
    }

    this.removeAllFromIncluded =function(){
        self.includedItems.forEach(function(element) {
            self.dispoItems.push(element);
        });
        self.includedItems = [];
    }

    this.selectItem = function(){
        self.includedItems.push(this.selectedDispoItems[0]);
        a = self.dispoItems.indexOf(this.selectedDispoItems[0]);
        self.dispoItems.splice(a, 1);
    };

    this.deselectItem = function(){
        self.dispoItems.push(this.selectedIncludedItems[0]);
        a = self.includedItems.indexOf(this.selectedIncludedItems[0]);
        self.includedItems.splice(a, 1);
    };


}]);