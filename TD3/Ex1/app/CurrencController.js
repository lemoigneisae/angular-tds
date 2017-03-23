/**
 * Created by isaelemoigne on 07/03/2017.
 */
myApp.controller('CurrencyController',['$http','$sce', function($http,$sce) {

    this.historiq = false;
    this.historique={};
    this.currenc;
    this.var = 1;
    this.debut = "EUR";
    this.fin = "USD";
    this.resultat;

    var self = this;

    $http.get('app/data/currencymap.json').
    then(function(response){
        self.currenc = response.data;
    });

    this.getResultat = function(){
        url = $sce.trustAsResourceUrl('https://free.currencyconverterapi.com/api/v3/convert?compact=y&q='+self.debut+'_'+self.to);

        $http.jsonp(url, {jsonCallbackParam: 'callback'}).
        then(function(resultat){
            if(!jQuery.isEmptyObject(resultat.data)) {
                console.log(resultat.data);
                this.val = resultat.data[self.debut + '_' + self.fin].val;
                self.resultat = val * self.var;

                if(self.historiq === true){
                    console.log("interieur");
                    var conversion={
                        debut : self.debut,
                        fin : self.fin,
                        amount : function(){ return self.var*this.rate},
                        initialAmount : function(){ return self.var*this.initialRate},
                        delta : 0,
                        rate : val,
                        var : self.var,
                        date : new Date(),
                        update: false,
                        initialRate : val
                    };

                    var key=self.debut+self.fin;

                    if(self.historique[key]){
                        var oldConversion=self.historique[key];
                        oldConversion.var=self.var;
                        conversion.delta=conversion.amount()-oldConversion.initialAmount();
                        conversion.initialRate=oldConversion.initialRate;
                    }

                    conversion.update=false;
                    self.historique[key]=conversion;
                }
            }
            else
                alert('Erreur de conversion');
        });
    }

    this.swap = function(){
        var tmp = self.debut;
        self.debut = self.fin;
        self.fin = tmp;
    }
}]);