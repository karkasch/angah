module Angah {
    export class Dirs {
        public static SearchPanelDirective(): ng.IDirective {
            return {
                restrict: 'E',
                link: function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {

                },
                template: '***<div><input type="textbox" />999</div>',
                //templateUrl: '~/Scripts/'
            }
        }
    }
} 