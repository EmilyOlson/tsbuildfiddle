import {testMap} from '../modules/map.module';

function mapDirective() {
    let directive = {
        link: link,
        templateUrl: '/templates/map.directive.template.html',
        transclude: true,
        scope: {
            targetId: '@',
        }
    };

    return directive;

    function link(scope: any) {
        scope.map = testMap.start(scope.targetId, []);
    }
}

export {mapDirective};