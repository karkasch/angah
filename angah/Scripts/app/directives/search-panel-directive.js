var Angah;
(function (Angah) {
    var Dirs = (function () {
        function Dirs() {
        }
        Dirs.SearchPanelDirective = function () {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                },
                template: '***<div><input type="textbox" />999</div>',
            };
        };
        return Dirs;
    })();
    Angah.Dirs = Dirs;
})(Angah || (Angah = {}));
//# sourceMappingURL=search-panel-directive.js.map