angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){


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
      },
      layers:{
        baselayers:{
          osm:{
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          }
        }
      }
    });
  });
