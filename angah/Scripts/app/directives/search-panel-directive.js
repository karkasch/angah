var Angah;
(function (Angah) {
    var Dirs = (function () {
        function Dirs() {
        }
        Dirs.SearchPanelDirective = function ($compile, searchSvc) {
            var _this = this;
            return {
                restrict: 'E',
                scope: {
                    terms: "=",
                    changed: "="
                },
                link: function (scope, element, attrs) {
                    var $scope = scope;
                    var elem = element;
                    $scope.statusIcon = "P";
                    $scope.searchText = "Type to search...";
                    //$scope.expanded = false;
                    $scope.searchResults = null;
                    $(elem).find('.txt-box').focus(function (e) {
                        $scope.searchText = "";
                        $scope.$apply();
                    });
                    $(elem).find('.search-result-panel').click(function (e) {
                        $(e.currentTarget).addClass('a-active');
                    });
                    $(elem).find('.search-results').keyup(function (e) {
                        console.log('ddd', e, _this);
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
                    });
                    //$(elem).find('.txt-box').keyup((e) => {
                    $scope.startSearch = function (e) {
                        console.log('start search', e);
                        if ($scope.searchText.length >= 2) {
                            $scope.statusIcon = "S";
                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done(function (response) {
                                $scope.statusIcon = "P";
                                $scope.searchResults = response;
                                $(elem).find('.search-result-panel').addClass('expanded');
                                $scope.$apply();
                            });
                        }
                    };
                    $scope.checkKeys = function (e) {
                        console.log('checkKeys', e);
                        if ($scope.searchText == "" && e.keyCode == 8) {
                            $scope.terms.splice($scope.terms.length - 1, 1);
                        }
                        else if (e.keyCode == 40) {
                            var res = $(elem).find('.search-results .res-item');
                            if (res.length > 0)
                                $(res[0]).focus();
                        }
                        else if (e.keyCode == 27) {
                            $(elem).find('.search-result-panel').removeClass('expanded');
                        }
                    };
                    $scope.removeItem = function (e, term) {
                        console.log('removed ss', e, term, $scope);
                        for (var i = 0; i < $scope.terms.length; i++) {
                            var t = $scope.terms[i];
                            if (t.id == term.id && t.text == term.text) {
                                t.animate = "animate-plobout";
                                window.setTimeout(function () {
                                    $scope.terms.splice(i, 1);
                                    $scope.$digest();
                                }, 280);
                                $scope.changed(e);
                                break;
                            }
                        }
                        //$scope.$apply();
                    };
                    $scope.selectTerm = function (e, asset) {
                        //e.preventDefault();
                        if (asset.children != null) {
                        }
                        else {
                            $scope.terms.push({ id: asset.id, text: asset.text, termType: 'asset', animate: "animate-plobin" });
                            $scope.changed(e);
                        }
                        $scope.searchText = "";
                    };
                    // hide search results when click away
                    $(document).click(function (e) {
                        if ($(e.target).closest('.search-result-panel,.search-box').length == 0) {
                            $(elem).find('.search-result-panel').removeClass('expanded');
                        }
                    });
                },
                templateUrl: '/Scripts/app/templates/search-panel.html'
            };
        };
        return Dirs;
    })();
    Angah.Dirs = Dirs;
    (function (SearchTermTypes) {
    })(Angah.SearchTermTypes || (Angah.SearchTermTypes = {}));
    var SearchTermTypes = Angah.SearchTermTypes;
})(Angah || (Angah = {}));
//# sourceMappingURL=search-panel-directive.js.map