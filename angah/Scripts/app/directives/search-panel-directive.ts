module Angah {
    export class Dirs {
        public static SearchPanelDirective($compile, searchSvc): ng.IDirective {
            return {
                restrict: 'E',
                scope: {
                    terms: "=",
                    changed: "="
                },
                link: (scope: ISearchPanelScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                    var $scope = scope;
                    var elem = element;

                    $scope.statusIcon = "P";
                    $scope.searchText = "Type to search...";
                    //$scope.expanded = false;
                    $scope.searchResults = null;

                    
                    $(elem).find('.txt-box').focus((e) => {
                        $scope.searchText = "";
                        $scope.$apply();
                    });

                    $(elem).find('.search-result-panel').click((e) => {
                        $(e.currentTarget).addClass('a-active');
                    });

                    $(elem).find('.txt-box').keyup((e) => {

                        if ($scope.searchText.length >= 2) {
                            $scope.statusIcon = "S";
                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done((response: ISearchResults) => {
                                $scope.statusIcon = "P";
                                $scope.searchResults = response;
                                $(elem).find('.search-result-panel').addClass('expanded');
                                $scope.$apply();
                            });
                        }
                        else if ($scope.searchText == "" && e.keyCode == 8) {
                            $scope.terms.splice($scope.terms.length - 1, 1);
                            $scope.$apply();
                        }
                    });

                    $scope.removeItem = (e: JQueryEventObject, term: any) => {
                        console.log('removed ss', e, term, $scope);
                        for (var i = 0; i < $scope.terms.length; i++) {
                            var t = $scope.terms[i];
                            if (t.id == term.id && t.text == term.text) {
                                t.animate = "animate-plobout";
                                window.setTimeout(() => {
                                    $scope.terms.splice(i, 1);
                                    $scope.$digest();
                                }, 280);
                                $scope.changed(e);
                                break;
                            }
                        }
                        //$scope.$apply();
                    }
                    
                    $scope.selectTerm = (e, asset) => {
                        //e.preventDefault();
                        if (asset.children != null) {
                            //$.each(asset.childer
                        }
                        else {
                            $scope.terms.push({ id: asset.id, text: asset.text, termType: 'asset', animate: "animate-plobin" });
                            $scope.changed(e);
                        }

                        $scope.searchText = "";
                    }


                    // hide search results when click away
                    $(document).click((e) => {
                        if ($(e.target).closest('.search-result-panel,.search-box').length == 0) {
                            $(elem).find('.search-result-panel').removeClass('expanded');
                        }
                    });

                },
                templateUrl: '/Scripts/app/templates/search-panel.html'
            }
        }
    }

    export interface ISearchPanelScope extends ng.IScope {
        test: string;
        statusIcon: string;
        //expanded: string;
        terms: Array<ISearchTerm>;
        changed: Function;
        searchText: string;
        searchTextFocus: Function;
        startSearch: Function;
        removeItem: Function;
        searchResults: ISearchResults;
        selectTerm: Function;
    }

    export interface ISearchResults {
        assets: Array<IAssetSearchResult>;
    }

    export interface IAssetSearchResult extends ISearchTerm {
        children?: Array<IAssetSearchResult>;
    }

    export interface ISearchTerm {
        id: string;
        text: string;
        termType: string;
        animate?: string;
    }

    export enum SearchTermTypes {
        
    }
} 