angular.module('MapCtrl', ['ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation, LatLngMarcador){
    $scope.lat = 6.2518;
    $scope.lng = -75.5636;
    var map;
    var markerPosicion;
    var latLng;



    angular.element(document).ready(function ()
    {
      latLng = new google.maps.LatLng({lat: $scope.lat, lng: $scope.lng});
      $scope.mostrarMapa();
      /*evento para el marcador*/
      markerPosicion.addListener('dragend', function() {
        var lat = this.getPosition().lat();
        var lng = this.getPosition().lng();
        if(kilometros(lat,lng,$scope.lat,$scope.lng) > 100){
          markerPosicion.setPosition(latLng);
        }
      });
      });


    $scope.mostrarMapa = function()
    {


      var latLng = {lat: $scope.lat , lng: $scope.lng };

      map = new google.maps.Map(document.getElementById('map'),{
        zoom: 18,
        center: {lat: 6.2518, lng: -75.5636},
        disableDefaultUI: true,
        scrollwheel: true,
        clickableIcons: false
      });

      var circle = new google.maps.Circle({
        strokeColor: '##063971',
        strokeOpacity: 0.5,
        strokeWeight: 3,
        fillColor: '##063971',
        fillOpacity: 0.1,
        map: map,
        center: {lat: 6.2518, lng: -75.5636} ,
        radius: 100,
        clickable: false
      });

      markerPosicion = new google.maps.Marker({
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 6.2518, lng: -75.5636},
        map: map,
        title: 'Hello World!'
      });


    }


    $scope.centrarMapa = function(){
      //map.locate({setView: true, maxZoom: 19});
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
