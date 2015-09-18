var Angah;
(function (Angah) {
    var Dirs = (function () {
        function Dirs() {
        }
        Dirs.SearchPanelDirective = function ($compile, searchSvc) {
            return {
                restrict: 'E',
                scope: {
                    terms: "="
                },
                link: function (scope, element, attrs) {
                    //console.log('searchSvc');
                    var $scope = scope;
                    var elem = element;
                    $scope.searchText = "Type to search...";
                    $scope.test = "test from D scrope";
                    $scope.expanded = false;
                    $scope.searchResults = {};
                    $(elem).find('.search-result-panel').hide();
                    $scope.searchTextFocus = function () {
                        $scope.searchText = " ";
                        console.log('search f');
                    };
                    $(elem).find('.txt-box').focus(function (e) {
                        e.preventDefault();
                        $(e.currentTarget).addClass('a-active');
                        $scope.searchText = "";
                        $(elem).find('.txt-box').val('');
                        $(elem).find('.search-result-panel').fadeIn(500);
                    });
                    $(elem).find('.search-result-panel').click(function (e) {
                        $(e.currentTarget).addClass('a-active');
                    });
                    //$(elem).find('.txt-box').keyup((e) => {
                    $(elem).find('.txt-box').keyup(function (e) {
                        console.log('search AAA', e, $scope);
                        if (e.keyCode == 8) {
                            $scope.terms.splice($scope.terms.length - 1, 1);
                            $scope.$apply();
                        }
                        if (e.keyCode == 13) {
                            console.log('search event', e, $scope);
                            $(elem).find('.txt-box').blur();
                            //$(e.currentTarget).blur();
                            //$scope.searchResults = {};
                            $.ajax({
                                url: "/api/v1/search",
                                dataType: "json",
                                contentType: "application/json",
                                cache: false
                            }).done(function (response) {
                                console.log('resss', response);
                                $scope.searchResults = response;
                                //$scope.terms.push({ id: 0, text: $scope.searchText });
                                $scope.searchText = "";
                                $(elem).find('.txt-box').val('');
                                $(elem).find('.search-result-panel').fadeIn(500);
                                $scope.$apply();
                            });
                        }
                    });
                    $scope.removeItem = function (text) {
                        console.log('removed', text);
                    };
                    $scope.selectTerm = function (e, asset) {
                        e.preventDefault();
                        $scope.terms.push({ id: asset.id, text: asset.text });
                    };
                    console.log('D scrope', $scope);
                    $(document).click(function (e) {
                        console.log('doc clicked', $scope, e);
                        if ($(e.target).closest('.search-result-panel,.search-box').length == 0) {
                            $(elem).find('.search-result-panel').fadeOut(400);
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
})(Angah || (Angah = {}));
//# sourceMappingURL=search-panel-directive.js.map