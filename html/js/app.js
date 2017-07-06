var captainApp = angular.module('captainApp', ['ui.router']);

captainApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  var states = [
    {
      name: 'dashboard',
      url: '/',
      component: 'dashboardController'
    },
    {
      name: 'attendees',
      url: '/attendees',
      component: 'attendeeController'
    },
    {
      name: 'resources',
      url: '/resources',
      component: 'resourceController'
    }
  ];

  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});
