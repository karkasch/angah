var Angah;
(function (Angah) {
    var Dirs = (function () {
        function Dirs() {
        }
        Dirs.SearchPanelDirective = function ($compile, searchSvc) {
            return {
                restrict: 'E',
                scope: {
                    terms: "=",
                    changed: "="
                },
                link: function (scope, element, attrs) {
                    //console.log('searchSvc');
                    var $scope = scope;
                    var elem = element;
                    $scope.searchText = "Type to search...";
                    $scope.test = "test from D scrope";
                    $scope.expanded = false;
                    $scope.searchResults = null; //{};
                    $(elem).find('.txt-box').focus(function (e) {
                        //$(e.currentTarget).addClass('a-active');
                        $scope.searchText = "";
                        //$(elem).find('.txt-box').val('');
                        $scope.$apply();
                    });
                    $(elem).find('.search-result-panel').click(function (e) {
                        $(e.currentTarget).addClass('a-active');
                    });
                    //$(elem).find('.txt-box').keyup((e) => {
                    $(elem).find('.txt-box').keyup(function (e) {
                        console.log('search AAA', e, $scope);
                        if (e.keyCode == 8) {
                        }
                        else if (e.keyCode == 13) {
                            console.log('search event', e, $scope);
                        }
                        else {
                        }
                        if ($scope.searchText.length >= 2) {
                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done(function (response) {
                                console.log('resss', response);
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
                        //$(elem).find('.txt-box').focus();
                    };
                    console.log('D scrope', $scope);
                    $(document).click(function (e) {
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