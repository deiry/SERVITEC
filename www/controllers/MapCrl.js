angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){

    /*variables para la ubicacion del gps*/

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
        iconSize:     [28, 40], // size of the icon
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
      $scope.centrarMapPosicion();
    });

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

    $scope.centrarMapPosicion = function()
    {

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      /* localizacion del dispositivo gps*/
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

          $scope.lat = lat;
          $scope.long=lat;


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
    }

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


    //Controlador de mapa para el test
  })
  .controller('MapTestCtrl', function($scope,$cordovaGeolocation){
    $scope.lat;
    $scope.long;
    var map;

     angular.element(document).ready(function () {
      $scope.mostrarMapa();
    });

    $scope.mostrarMapa = function()
    {

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      /* localizacion del dispositivo gps*/
      $cordovaGeolocation.getCurrentPosition(posOptions).then(
        function (position){
          $scope.lat = position.coords.latitude;
          $scope.long=position.coords.longitude;
          map = L.map('map').setView([$scope.lat, $scope.long], 17);

           L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
          }).addTo(map);
          L.control.scale().addTo(map);
          var myIcon = L.icon({
            blue: {
              type: 'div',
              iconSize: [15, 15],
              className: 'blue',
              iconAnchor:  [10, 10]
            },
            red: {
              iconUrl: 'img/iconAgente.png',
              shadowUrl: 'img/iconAgenteSombra.png',
              iconSize:     [28, 40], // size of the icon
              shadowSize:   [25, 15], // size of the shadow
              iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
              shadowAnchor: [22 , 60],  // the same for the shadow
              popupAnchor:  [-10, -93] // point from which the popup should open relative to the iconAnchor
            }
          });
          L.marker([$scope.lat, $scope.long],{draggable: true}, {icon: myIcon}).addTo(map);

        }, function(err) {
          alert('Por Favor Encienda el GPS');
          // error

        });
    }

    $scope.centrarMapa = function(){
      map.locate({setView: true, maxZoom: 18});
    }



  });

