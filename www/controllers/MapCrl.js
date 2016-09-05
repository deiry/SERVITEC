angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){

    var lat = 40.095;
    var long = -3.823;

    $scope.isOpen = false;

    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'}


    /* localizacion del dispositivo gps*/

    angular.element(document).ready(function () {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation.getCurrentPosition(posOptions).then(
        function (position){
          lat  = position.coords.latitude
          long = position.coords.longitude

          var mainMarker = {
            lat: lat,
            lng: long,
            focus: true,
            message: "Tú estas aquí.",
            draggable: true
          };
          console.log(lat);

          angular.extend($scope, {
            center: {
              lat: lat,
              lng: long,
              zoom: 16
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
            },
            markers:{
              mainMarker: angular.copy(mainMarker)
            }
          });

        }, function(err) {
          alert('Por Favor Encienda el GPS');
          // error

        });
    });

      console.log(lat);


    /*para centrar el mapa en esa longitud y latitud*/
    angular.extend($scope, {
      center: {
        lat: lat,
        lng: long,
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

