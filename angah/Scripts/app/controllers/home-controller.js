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
                var _this = this;
                this.$scope.test = "dedw";
                this.$scope.searchTerms = [{ id: "1", text: "HY-IUU", termType: "asset" }, { id: "2", text: "FC-I2U", termType: "asset" }];
                this.$scope.addTerm = "";
                this.$scope.addTermClicked = function () {
                    _this.addTermFromOutside();
                };
            };
            HomeController.prototype.addTermFromOutside = function () {
                this.$scope.searchTerms.push({ id: "-1", text: this.$scope.addTerm, termType: "text" });
            };
            HomeController.$inject = ['$scope'];
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
    })(Controllers = Angah.Controllers || (Angah.Controllers = {}));
})(Angah || (Angah = {}));
//# sourceMappingURL=home-controller.js.map