var Angah;
(function (Angah) {
    var Config = (function () {
        function Config($routeProvider) {
            $routeProvider.when("/home", { templateUrl: "Scripts/app/views/home.html", controller: "homeCtrl" }).when("/list/:id", { templateUrl: "App/Templates/VideoList.html", controller: "TechVidsListCtrl" }).otherwise({ redirectTo: '/home' });
        }
        Config.$inject = ['$routeProvider'];
        return Config;
    })();
    Angah.Config = Config;
})(Angah || (Angah = {}));
//# sourceMappingURL=app-config.js.map