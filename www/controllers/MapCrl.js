angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){
    $scope.lat = 6.2518;
    $scope.long = -75.5636;
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

          map = L.map('map').setView([$scope.lat, $scope.long], 19);


          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              /*attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',*/
              maxZoom: 19
          }).addTo(map);
          /*escala del mapa*/
          L.control.scale({position: 'bottomleft'}).addTo(map);
          /*circulo de radio de presiocion del gps*/
          L.circle([$scope.lat, $scope.long], 30).addTo(map);

          var Icon = L.icon({

            iconUrl: 'img/iconAgente.png',
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
          });

          L.marker([$scope.lat, $scope.long],{draggable: true}, {icon: Icon}).addTo(map);


        }, function(err) {
          alert('Por Favor Encienda el GPS');
          // error

        });
      map.on('clcik',function(e){
        alert(e.latlng);
      });
    }

    $scope.centrarMapa = function(){
      map.locate({setView: true, maxZoom: 19});
    }



  });
