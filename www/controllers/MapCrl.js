angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){

    $scope.isOpen = false;

    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'}

    /* localizacion del dispositivo gps*/

    /*para centrar el mapa en esa longitud y latitud*/
    angular.extend($scope, {
      center: {
        lat: 40.095,
        lng: -3.823,
        zoom: 12
      },
      defaults: {
        scrollWheelZoom: false
      }
    });
  });
