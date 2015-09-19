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
                    //console.log('searchSvc');
                    var $scope = scope;
                    var elem = element;

                    $scope.statusIcon = "P";
                    $scope.searchText = "Type to search...";
                    $scope.test = "test from D scrope";
                    $scope.expanded = false;
                    $scope.searchResults = null;//{};

                    
                    $(elem).find('.txt-box').focus((e) => {
                        //$(e.currentTarget).addClass('a-active');
                        $scope.searchText = "";
                        //$(elem).find('.txt-box').val('');
                        $scope.$apply();
                    });

                    $(elem).find('.search-result-panel').click((e) => {
                        $(e.currentTarget).addClass('a-active');
                    });

                    //$(elem).find('.txt-box').keyup((e) => {

                    $(elem).find('.txt-box').keyup((e) => {
                        console.log('search AAA', e, $scope);
                        if (e.keyCode == 8) {
                            //$scope.terms.splice($scope.terms.length - 1, 1);
                            //$scope.$apply();
                        }
                        else if (e.keyCode == 13) {
                            console.log('search event', e, $scope);

                            //$(elem).find('.txt-box').blur();
                            //$(e.currentTarget).blur();
                            //$scope.searchResults = {};
                        }
                        else {
                            //$(elem).find('.search-result-panel').removeClass('expanded');
                        }

                        if ($scope.searchText.length >= 2) {
                            $scope.statusIcon = "S";
                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done((response: ISearchResults) => {
                                console.log('resss', response);
                                $scope.statusIcon = "P";

                                $scope.searchResults = response;

                                //$scope.terms.push({ id: 0, text: $scope.searchText });
                                //$scope.searchText = "";
                                //$(elem).find('.txt-box').val('');
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
                        //$(elem).find('.txt-box').focus();
                    }

                    console.log('D scrope', $scope);

                    $(document).click((e) => {
                        //console.log('doc clicked', $scope, e);

                        if ($(e.target).closest('.search-result-panel,.search-box').length == 0) {
                            $(elem).find('.search-result-panel').removeClass('expanded');
                        }

                        //$scope.expanded = false;

                        //if ($(elem).find('.txt-box').hasClass('a-active') || 
                        //    $(elem).find('.search-result-panel').hasClass('a-active')) {
                            
                        //} else {
                        //    $(elem).find('.search-result-panel').fadeOut(400);
                        //}

                        
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
        statusIcon: string;
        expanded: boolean;
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