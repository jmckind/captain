//
// Dashboard Controller
//

function DashboardController($scope) {
  var ctrl = this;

  ctrl.event = {name: 'New Event'};
}

angular.module('captainApp').component('dashboardController', {
  templateUrl: '../dashboard.html',
  controller: DashboardController
});
