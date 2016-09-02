// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('servitec', ['ionic', 'starter.controllers',
  /**
   * Directivas para los Controladores
   */
  'MapCtrl','FabCtrl'
  ])


myApp.run(function($ionicPlatform) {
    console.log('My app is ready');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  });

   $stateProvider.state('map', {
     url: '/map',
     templateUrl: 'templates/map.html',
     controller: 'MapCtrl'
    });

   $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
    });

  $stateProvider.state('formulario', {
    url: '/formulario',
    templateUrl: 'templates/formulario.html'
  });

  $stateProvider.state('footer', {
    url: '/footer',
    templateUrl: 'templates/footer.html'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})

myApp.directive("footer", function(){
  return{
    templateUrl: 'templates/footer.html'
  };
})
