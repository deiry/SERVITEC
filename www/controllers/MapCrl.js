angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation, LatLngMarcador){
    $scope.lat = 6.2518;
    $scope.long = -75.5636;
    var map;

    angular.element(document).ready(function () {

      $scope.mostrarMapa();

    });

    $scope.mostrarMapa = function()
    {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      var Icon = L.icon({
        iconUrl: 'img/iconAgente.png',
        iconSize:     [38, 55], // size of the icon
        iconAnchor:   [20,50], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      var marcador;

      /* localizacion del dispositivo gps*/
      $cordovaGeolocation.getCurrentPosition(posOptions).then(
        function (position){
          $scope.lat = position.coords.latitude;
          $scope.long=position.coords.longitude;


          marcador = new L.marker([$scope.lat, $scope.long], {icon: Icon, draggable: true});

          map = L.map('map').setView([$scope.lat, $scope.long], 19);


          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              /*attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',*/
              maxZoom: 19
          }).addTo(map);
          /*escala del mapa*/
          L.control.scale({position: 'bottomleft'}).addTo(map);
          /*circulo de radio de presiocion del gps*/
          L.circle([$scope.lat, $scope.long], 50).addTo(map);

          marcador.bindPopup('<h4>hola</h4>',{offset: (6,0)});

          marcador.addTo(map);


          marcador.on('dragend',function(event) {
            var marker = event.target;
            var position = marker.getLatLng();
            console.log(position.lat);

            LatLngMarcador.lat = position.lat;
            LatLngMarcador.lng = position.lng;

            if(kilometros($scope.lat,$scope.long,position.lat,position.lng) > 50)
            {
              marker.setLatLng([$scope.lat,$scope.long]);
              LatLngMarcador.lat = $scope.lat;
              LatLngMarcador.lng = $scope.long;
            }


          });

        }, function(err) {
          alert('Por Favor Encienda el GPS');
          // error

        });

    }

    $scope.centrarMapa = function(){
      map.locate({setView: true, maxZoom: 19});
    }



  });
/**
 * \fn getKilometros().
 *
 * \Description: Devuelve la distancia en kilomegtros entre dos puntos dados por su latitud y longitud
 *
 * \param (integer) lat1 : Latitud del punto 1
 * \param (integer) long1 : Longitud del punto 1
 * \param (integer) lat2 : Latitud del punto 2
 * \param (integer) long2 : Longitud del punto 2
 *
 * \return (integer) Distancia en kilometros
 *
 **/

function kilometros(lat1,lon1,lat2,lon2)
{
  rad = function(x) {return x*Math.PI/180;}
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c *1000;
  return d.toFixed(3); //Retorna tres decimales
}
