module Angah {
    export class Config {
        static $inject = ['$routeProvider'];

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/home", { templateUrl: "Scripts/app/views/home.html", controller: "homeCtrl" })
                .when("/list/:id", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" })
                .otherwise({ redirectTo: '/home' });
        }
    }
} 