module Angah.Controllers {
    export class HomeController {
        static $inject = ['$scope'];
        private $scope: IHomeScope;

        constructor($scope: IHomeScope) {
            this.$scope = $scope;

            this.init();
        }

        private init(): void {
            this.$scope.test = "dedw";
            this.$scope.searchTerms = [{ id: 1, text: "HY-IUU" }, { id: 2, text: "FC-I2U" }];
        }
    }


    export interface IHomeScope extends ng.IScope {
        test: string;
        searchTerms: any;
    }
} 