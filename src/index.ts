import * as angular from 'angular';
declare let require: any;
require('./scss/main.scss');
import 'bootstrap-sass';

//directives
import { mapDirective } from './directives/map.directive';

let app = angular.module('demo', []);

app.controller('main', mainController);

app.directive('mapDirective', mapDirective);

function mainController(){
  let vm = this;
    vm.test = 'Angular is working';
    vm.canEdit = true;
}
