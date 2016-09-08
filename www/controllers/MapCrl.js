angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){

    /*variables para la ubicacion del gps*/

    $scope.lat = 0;
    $scope.lng = 0;
    var lat;
    var long;
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
    };

    $scope.layers = {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
        }
      }
    };
    $scope.center = {
      zoom: 19
    };


    /* localizacion del dispositivo gps*/

    angular.element(document).ready(function () {
      $scope.centrarMapPosicion();
      angular.extend($scope, {
        center: {
          lat: $scope.lat,
          lng: $scope.lng,
          zoom: 19

        },
        defaults: {
          scrollWheelZoom: false,
          //zoomAnimation: true
        },

      });
    });

    /*para centrar el mapa en esa longitud y latitud*/


    /************FUNCIONES****************/

      /**
       * esta funcion captura la posicion y centrar el mapa
       */
    $scope.centrarMapPosicion = function()
    {

      var posOptions = {timeout: 500, enableHighAccuracy: false};
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

          $scope.center.lat = lat;
          $scope.center.lng = long;
          $scope.center.zoom = 19;

          $scope.lat = lat;
          $scope.lng = long;

          $scope.markers = {
            mainMarker: angular.copy(mainMarker)
          }

          //alert(lat);
        },
        function(err) {
          alert('Por Favor Encienda el GPS'+err);
          // error

        });
      //alert("latitud: "+$scope.lat+" longitud: "+$scope.long);
    }

    $scope.centrarMap = function(){
      $scope.center.lat = $scope.lat;
      $scope.center.lng = $scope.lng;
      $scope.center.zoom = 19;
      alert("latitud: "+$scope.lat+" longitud: "+$scope.lng);
      document.getElementById('map').setAttribute('centar',$scope.center);
    };


  });
