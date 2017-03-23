# TD Angular

[![N|Solid](https://dynamicimagesfr-v2b.netdna-ssl.com/product_class_external_product/angular_js_2_128_n.png)](https://angularjs.org/)

## TD1 : Bases de l'Angular JS

### TD1_EX1 : Application note

#### Fonctionnalités :

- Saisir un message texte et afficher le nombre de caractères restants (le message est limité à 100 caractères saisis)
```sh
<textarea data-ng-change="ctlapp.count()" name="message" id="message" data-ng-model="ctlapp.message" cols="40" rows="5" class="form-control ng-valid ng-valid-maxlength ng-dirty ng-valid-parse ng-touched" maxlength="100" style=""></textarea>

this.count = function() {
        self.nb = 100 - self.message.length;
        if(self.nb<100){
            self.info='Note modifié';
        }
        else{self.info='';}
    }
```
- Enregistrer le contenu
```sh
<button data-ng_click="ctlapp.save()" class="btn btn-primary">Enregistrer</button>
this.save = function() {
        if(self.nb<100){
            self.info = 'Note sauvegardée';
        }
    }
```
- Effacer le contenu
```sh
<button data-ng-click="ctlapp.clear()" class="btn btn-primary">Effacer</button>
this.clear = function() {
        self.message='';
        self.info ='';
        self.nb=100;
    }
```
- Afficher les messages d'info
```sh
<div ng-show="ctlapp.info"
                     ng-class="{
                            'alert-info':ctlapp.message=='',
                            'alert-warning':ctlapp.message!='' &amp;&amp; ctlapp.info!='Note sauvegardée',
                            'alert-danger':ctlapp.nb<10 &amp;&amp; ctlapp.info!='Note sauvegardée',
                            'alert-success' :ctlapp.info=='Note sauvegardée'
                      }"
                     class="alert alert-dismissible alert-info" role="alert" data-ng-show="info" style="">
```


#### Interface de l'application :

[![N|Solid](http://slamwiki.kobject.net/_media/slam4/richclient/angularjs/ex1-note.png?cache=)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td1)


### TD1_EX2 : Choix de services

#### Fonctionnalités :

- Sélectionner/désélectionner des services
```sh
<li ng-repeat="service in ctlapp.services" ng-click="ctlapp.toggleActive(service)" ng-class="{active:service.active==true}" class="ng-binding ng-scope">
        
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
```
- Calculer le montant dû
```sh
    this.promoExiste = function(){
        $http.get("./app/data/promo.json").then(function(response) {
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
```
- Afficher le nombre de services sélectionnés
```sh
this.total = function() {
        var prix = 0;
        angular.forEach(this.services, function(value, key){
            if(value.active == true)
                prix = prix+value.price;
        });
        this.letotal = prix;
    }
```

#### Interface de l'application :

[![N|Solid](http://slamwiki.kobject.net/_media/slam4/richclient/angularjs/td1-ex2-services.png?w=350&tok=2bd648)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td1)

## TD2 : Directives, Services et Filtres

#### Fonctionnalités :

- Lister les produits disponibles
```sh
    $http.get("./app/data/dispoItems.json").then(
        function (response) {
            self.dispoItems = response.data;
        });
<select title="Double-cliquez pour ajouter" class="form-control ng-pristine ng-untouched ng-valid" ng-model="chctl.selectedDispoItems" ng-dblclick="chctl.selectItem()" ng-options="item.title for item in chctl.dispoItems" size="8" multiple="multiple"></select>
```
- Ajouter des produits disponibles aux produits sélectionnés
```sh
    this.selectItem = function(){
        self.includedItems.push(this.selectedDispoItems[0]);
        a = self.dispoItems.indexOf(this.selectedDispoItems[0]);
        self.dispoItems.splice(a, 1);
    };

<select title="Double-cliquez pour ajouter" class="form-control ng-pristine ng-untouched ng-valid" ng-model="chctl.selectedIncludedItems" ng-dblclick="chctl.deselectItem()" ng-options="item.title for item in chctl.includedItems" size="10" multiple="multiple"></select>
<div title="Ajouter" class="btn btn-primary list-btn" ng-click="chctl.addToIncluded()" ng-disabled="chctl.selectedDispoItems.length<1" disabled="disabled"><span aria-hidden="true" class="glyphicon glyphicon-step-forward"></span></div>
```
- Ajouter tous les produits disponibles aux produits sélectionnés
```sh
    this.addAllToIncluded = function(){
        self.dispoItems.forEach(function(element) {
            self.includedItems.push(element);
        });
        self.dispoItems = [];
    }

<div title="Ajouter tous" class="btn btn-primary list-btn" ng-click="chctl.addAllToIncluded()" ng-disabled="chctl.dispoItems.length<1"><span aria-hidden="true" class="glyphicon glyphicon-fast-forward"></span></div>
```
- Retirer un ou plusieurs produits sélectionnés
```sh
    this.removeFromIncluded = function(){
        this.selectedIncludedItems.forEach(function(element) {
            self.dispoItems.push(element);
            a = self.includedItems.indexOf(element);
            self.includedItems.splice(a, 1);
        });
    }
    
<div title="Retirer" class="btn btn-primary list-btn" ng-click="chctl.removeFromIncluded()" ng-disabled="chctl.selectedIncludedItems.length<1" disabled="disabled"><span aria-hidden="true" class="glyphicon glyphicon-step-backward"></span></div>

```
- Retirer tous les produits sélectionnés
```sh
this.removeAllFromIncluded = function(){
    self.includedItems.forEach(function(element) {
        self.dispoItems.push(element);
    });
    self.includedItems = [];
};

<div title="Retirer tous" class="btn btn-primary list-btn" ng-click="chctl.removeAllFromIncluded()" ng-disabled="chctl.includedItems.length<1" disabled="disabled"><span aria-hidden="true" class="glyphicon glyphicon-fast-backward"></span></div>
```
- Valider le choix de produits sélectionnés
```sh
<div class="btn btn-primary" style="width:98%;text-align: right" ng-click="chctl.step=2" ng-disabled="chctl.includedItems.length<1" disabled="disabled">
```
- Revenir au choix des produits
```sh
<div class="btn btn-primary" style="width:98%;text-align: right;margin-top:5px" ng-click="chctl.step=1">
                    <span aria-hidden="true" class="glyphicon glyphicon-circle-arrow-left"></span>
                    <span>     Retour au choix précédent</span>
</div>
```

#### Interface de l'application :

[![N|Solid](http://slamwiki.kobject.net/_media/slam4/richclient/angularjs/td1-ex3.png?w=700&tok=9b1ee6)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td2)
[![N|Solid](http://slamwiki.kobject.net/_media/slam4/richclient/angularjs/td1-ex3-2.png?w=700&tok=b922cc)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td2)


### TD2_EX2 : Gestion des contacts

#### Fonctionnalités :

- Obtenir la liste des contacts et la filtrer
```sh
<tr contact-elem="" class="animate-repeat ng-scope" data-ng-repeat="contact in ctCtrl.contact | Filtre | filter:mot as resultat">
```
- Ajouter un contact dans la liste
```sh
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

```
- Modifier un contact existant
```sh
this.MiseAJour = function(contact){
        self.modif="MAJ";
        console.log(contact);
        self.unContact = contact;
        console.log(self.unContact);
    };
```
- Supprimer un contact
```sh
    this.Suppression = function(contact){
        self.resultat.push(contact);
        contact.suppr = true;
        console.log(contact);
    };
```

#### Interface de l'application :

[![N|Solid](http://slamwiki.kobject.net/_detail/slam4/richclient/angularjs/ex3.png?id=slam4%3Arichclient%3Aangularjs%3Atd2)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td2)

## TD3 : Service http et API

### TD3_EX1 : Convertisseur de devises

#### Fonctionnalités :

- Saisir un montant dans une devise de départ
```sh
<input type="text" class="form-control" size="5" data-ng-model="curCtrl.what">
```
- Sélectionner la devise de départ ainsi que la devise cible
```sh
<select class="form-control" data-ng-options="v.code as (v.code + ' - ' + v.name) for (k,v) in curCtrl.currenc" data-ng-model="curCtrl.debut" style="text-transform: capitalize"></select>
                            <a href="#" data-ng-click="curCtrl.swap()"><--></a>
<select class="form-control" data-ng-options="v.code as (v.code + ' - ' + v.name) for (k,v) in curCtrl.currenc" data-ng-model="curCtrl.fin" style="text-transform: capitalize"></select>
```
- Calculer la conversion à partir des taux courants
```sh
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
```
- Effectuer l'opération inverse (échange des devises)
```sh
<a href="#" data-ng-click="curCtrl.swap()"><--></a>
this.swap = function(){
        var tmp = self.debut;
        self.debut = self.fin;
        self.fin = tmp;
    }
```
#### Interface de l'application :

[![N|Solid](http://slamwiki.kobject.net/_media/slam4/richclient/angularjs/ex4.png?w=600&tok=2cbd23)](http://slamwiki.kobject.net/slam4/richclient/angularjs/td3)
