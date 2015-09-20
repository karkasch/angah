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
                    var searchTimeout = null;

                    $scope.statusIcon = "P";
                    $scope.searchText = "";
                    //$scope.expanded = false;
                    $scope.searchResults = null;

                    
                    $(elem).find('.txt-box').focus((e) => {
                        $scope.searchText = "";
                        $scope.$apply();
                    });

                    $(elem).find('.txt-box').dblclick((e: JQueryEventObject) => {
                        $(elem).find('.search-result-panel').addClass('expanded');
                    });

                    $(elem).find('.search-result-panel').click((e) => {
                        $(e.currentTarget).addClass('a-active');
                    });

                    $(elem).find('.search-results').keyup((e) => {
                        console.log('ddd', e, this);
                        if (e.keyCode == 38 && $(e.target).hasClass('res-item')) {
                            var prev = $(e.target).prev('tr');
                            if (prev.length > 0)
                                prev.focus();
                            else
                                $(elem).find('.txt-box').focus();
                        }
                        else if (e.keyCode == 40 && $(e.target).hasClass('res-item')) {
                            $(e.target).next('tr').focus();
                        }
                        else if (e.keyCode == 13) {
                            $(e.target).find('.asset').click();
                        }
                        else if (e.keyCode == 27) { // esc
                            $(elem).find('.search-result-panel').removeClass('expanded');
                            $(elem).find('.txt-box').focus();
                        }
                    });

                    $scope.startSearchDelayed = (e: JQueryEventObject) => {
                        $(elem).find('.search-result-panel').removeClass('expanded');

                        if (searchTimeout != null)
                            window.clearTimeout(searchTimeout);

                        searchTimeout = window.setTimeout(() => {
                            if ($scope.searchText.length >= 2) {
                                $scope.statusIcon = "S";
                                $scope.$apply();
                                $.ajax({
                                    url: "/api/v1/search?q=" + $scope.searchText,
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
                        }, 500);
                    }

                    //$scope.startSearch = (e: JQueryEventObject) => {
                    //    console.log('start search', e);

                    //    if ($scope.searchText.length >= 2) {
                    //        $scope.statusIcon = "S";
                    //        $.ajax({
                    //            url: "/api/v1/search",
                    //            dataType: "json",
                    //            contentType: "application/json",
                    //            cache: false
                    //        }).done((response: ISearchResults) => {
                    //            $scope.statusIcon = "P";
                    //            $scope.searchResults = response;
                    //            $(elem).find('.search-result-panel').addClass('expanded');
                    //            $scope.$apply();
                    //        });
                    //    }
                    // };

                    $scope.checkKeys = (e) => {
                        console.log('checkKeys', e);
                        //if ($scope.searchText == "" && e.keyCode == 8) {
                        //    $scope.terms.splice($scope.terms.length - 1, 1);
                        //    //$scope.$apply();
                        //}
                        if (e.keyCode == 40) {
                            if (!$(elem).find('.search-result-panel').hasClass('expanded'))
                                $(elem).find('.search-result-panel').addClass('expanded');

                            var res = $(elem).find('.search-results .res-item');
                            if (res.length > 0)
                                $(res[0]).focus();
                        }
                        else if (e.keyCode == 27) {
                            $(elem).find('.search-result-panel').removeClass('expanded');
                        }
                    }

                    $scope.checkKeysDown = (e: JQueryEventObject) => {
                        if (e.keyCode == 8 && $scope.searchText == "") {
                            $scope.terms.splice($scope.terms.length - 1, 1);
                        }
                    }

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
        startSearchDelayed: Function;
        checkKeys: Function;
        checkKeysDown: Function;
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