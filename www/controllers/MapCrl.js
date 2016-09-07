angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){

<<<<<<< HEAD
    var lat = 40.095;
    var long = -3.823;
    /*icono para el marcador*/
    var icons = {
      blue: {
        type: 'div',
        iconSize: [15, 15],
        className: 'blue',
        iconAnchor:  [10, 10]
      },
      red: {
        iconUrl: 'img/iconAgente.png',
        shadowUrl: 'img/iconAgenteSombra.png',
        iconSize:     [25, 40], // size of the icon
        shadowSize:   [25, 15], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [22 , 60],  // the same for the shadow
        popupAnchor:  [-10, -93] // point from which the popup should open relative to the iconAnchor
      }
    }


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

          /*marcador de posicion del agente*/
          var mainMarker = {
            lat: lat,
            lng: long,
            icon: icons.red,
            focus: true,
            message: "latitud: "+lat+" longitud: "+long,
            draggable: true//de este se bloquea para que el marcador no se pueda mover

          };


          angular.extend($scope, {
            center: {
              lat: lat,
              lng: long,
              zoom: 19
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




=======

    /* localizacion del dispositivo gps*/

>>>>>>> origin/master
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
