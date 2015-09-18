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
                this.$scope.searchTerms = [{ id: 1, text: "HY-IUU" }, { id: 2, text: "FC-I2U" }];
            };
            HomeController.$inject = ['$scope'];
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
    })(Controllers = Angah.Controllers || (Angah.Controllers = {}));
})(Angah || (Angah = {}));
//# sourceMappingURL=home-controller.js.map