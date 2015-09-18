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
                link: function (scope, elem, attrs) {
                    //console.log('searchSvc');
                    var $scope = scope;
                    $scope.searchText = "Type to search...";
                    $scope.test = "test from D scrope";
                    $scope.expanded = false;
                    $scope.searchTextFocus = function () {
                        $scope.searchText = " ";
                        console.log('search f');
                    };
                    $scope.startSearch = function (e) {
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
                            }).done(function (response) {
                                console.log('resss', response);
                                $scope.searchResults = response;
                                $scope.terms.push({ id: 0, text: $scope.searchText });
                                $scope.searchText = "";
                            });
                        }
                    };
                    $scope.removeItem = function (text) {
                        console.log('removed', text);
                    };
                    $scope.selectTerm = function (asset) {
                        $scope.terms.push({ id: asset.id, text: asset.text });
                    };
                    console.log('D scrope', $scope);
                    $(document).click(function () {
                        console.log('doc clicked', $scope);
                        $scope.expanded = false;
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