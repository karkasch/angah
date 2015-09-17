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
        }
    }


    export interface IHomeScope extends ng.IScope {
        test: string;
    }
} 