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
            this.$scope.searchTerms = [{ id: "1", text: "HY-IUU", termType: "asset" }, { id: "2", text: "FC-I2U", termType: "asset" }];
            this.$scope.searchTermsChanged = (e) => {
                console.log('search term changed', e, this.$scope.searchTerms);
            }
            this.$scope.addTerm = "";
            this.$scope.addTermClicked = () => {
                this.addTermFromOutside();
            }
        }

        public addTermFromOutside(): void {
            this.$scope.searchTerms.push({ id: "-1", text: this.$scope.addTerm, termType: "text", animate: "animate-plobin" });
        }
    }


    export interface IHomeScope extends ng.IScope {
        test: string;
        searchTerms: Array<ISearchTerm>;
        addTermClicked: Function;
        addTerm: string;
        searchTermsChanged: Function;
    }
} 