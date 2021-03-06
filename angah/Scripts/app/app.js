/// <reference path="../typings/angularjs/angular.d.ts" />
var Angah;
(function (Angah) {
    var App = (function () {
        function App() {
        }
        return App;
    })();
    Angah.App = App;
})(Angah || (Angah = {}));
var app = angular.module("app", ['ngRoute']);
app.factory('searchSvc', Angah.Services.SearchService);
app.config(Angah.Config);
app.controller("homeCtrl", Angah.Controllers.HomeController);
app.directive("searchPanel", [Angah.Dirs.SearchPanelDirective]);
//# sourceMappingURL=app.js.map