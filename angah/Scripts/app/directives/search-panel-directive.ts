module Angah {
    export class Dirs {
        public static SearchPanelDirective($compile, searchSvc): ng.IDirective {
            return {
                restrict: 'E',
                scope: {
                    terms: "="
                },
                link: (scope: ISearchPanelScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                    //console.log('searchSvc');
                    var $scope = scope;
                    $scope.searchText = "Type to search...";
                    $scope.test = "test from D scrope";
                    $scope.expanded = false;

                    $scope.searchTextFocus = () => {
                        $scope.searchText = " ";
                        console.log('search f');
                    };

                    $scope.startSearch = (e: any) => {
                        console.log('search AAA', e, $scope);
                        if (e.keyCode == 8) {
                            $scope.terms.splice($scope.terms.length - 1, 1);
                        }
                        if (e.keyCode == 13) {
                            console.log('search event', e, $scope);

                            $(e.currentTarget).blur();
                            $scope.searchResults = {};

                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done((response) => {
                                console.log('resss', response);

                                $scope.searchResults = response;

                                $scope.terms.push({ id: 0, text: $scope.searchText });
                                $scope.searchText = "";

                                
                            });

                            //$scope.expanded = true;
                            

                        }
                    };

                    $scope.removeItem = (text) => {
                        console.log('removed', text);
                    }
                    
                    $scope.selectTerm = (asset) => {
                        $scope.terms.push({ id: asset.id, text: asset.text });
                    }

                    console.log('D scrope', $scope);

                    $(document).click(() => {
                        console.log('doc clicked', $scope);
                        $scope.expanded = false;
                    });

                    //$(elem).on('click', (e) => {
                    //    alert(e);
                    //});
                },
                templateUrl: '/Scripts/app/templates/search-panel.html'
            }
        }
    }

    export interface ISearchPanelScope extends ng.IScope {
        test: string;
        expanded: boolean;
        terms: Array<any>;
        searchText: string;
        searchTextFocus: Function;
        startSearch: Function;
        removeItem: Function;
        searchResults: any;
        selectTerm: Function;
    }
} 