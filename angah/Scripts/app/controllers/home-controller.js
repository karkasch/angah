var Angah;
(function (Angah) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController($scope) {
                this.$scope = $scope;
                this.init();
            }
            HomeController.prototype.init = function () {
                this.$scope.test = "dedw";
            };
            HomeController.$inject = ['$scope'];
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
    })(Controllers = Angah.Controllers || (Angah.Controllers = {}));
})(Angah || (Angah = {}));
//# sourceMappingURL=home-controller.js.map