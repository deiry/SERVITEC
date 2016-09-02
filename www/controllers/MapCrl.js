angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons'])

  .controller('MapCtrl', function($scope){


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


