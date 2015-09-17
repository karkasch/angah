/// <reference path="../typings/angularjs/angular.d.ts" />
module Angah {
    export class App {


    }

} 

var app = angular.module("app", ['ngRoute']);
app.config(Angah.Config);
app.controller("homeCtrl", Angah.Controllers.HomeController);

