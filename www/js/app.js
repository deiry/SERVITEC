/*Android manifest

 <uses-permissionandroid android:name="android.permission.ACCESS_COARSE_LOCATION" />
 <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
 <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
 <uses-permission android:name="android.permission.CAMERA" />
 <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

 cordova plugin add cordova-plugin-camera
 cordova plugin add cordova-plugin-geolocation
 cordova plugin add cordova-plugin-file-transfer
 cordova plugin add cordova-plugin-whitelist
 cordova plugin add cordova-plugin-file


 * */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('servitec', ['ionic', 'starter.controllers',
  /**
   * Directivas para los servicios
   */
  'reporteSenalService',
  /**
   * Directivas para los Controladores
   */
  'MapCtrl', 'FormCtrl','MenuCtrl'
  ])


.run(function($ionicPlatform ) {

  $ionicPlatform.ready(function() {
    //console.log(FileTransfer);
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })
    .state('app.form', {
      url: '/form',
      views: {
        'menuContent': {
          templateUrl: 'templates/formulario.html',
          controller: 'FormCtrl'
        }
      }
    })

    .state('app.menu', {
      url: '/menu',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu.html',
          controller: 'MenuCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'MenuCtrl'
        }
      }
    })

;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
})
.service('LatLngMarcador',[function ()
{
  return {
    img: '',
    icon: '',
    lat : 0,
    lng: 0
  }
}
  ])

