angular.module('MapCtrl', ['ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation, LatLngMarcador, reporteSenalService, $timeout){
    $scope.lat = 6.2518;
    $scope.lng = -75.5636;
    var map;
    var markerPosicion;
    var latLng;



    angular.element(document).ready(function ()
    {
      latLng = new google.maps.LatLng({lat: $scope.lat, lng: $scope.lng});
      $scope.mostrarMapa();

    });


    $scope.mostrarMapa = function()
    {
      map = new google.maps.Map(document.getElementById('map'),{
        zoom: 18,
        disableDefaultUI: true,
        scrollwheel: true,
        clickableIcons: false
      });

      var posOptions = {timeout: 4000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;

          latLng = new google.maps.LatLng({lat: lat, lng: long});
          console.log(latLng);
          map.setCenter(latLng);

        }, function(err) {
          // error
        });

      $timeout(function(){

        latLng = map.getCenter();

        $scope.lat = latLng.lat();
        $scope.lng = latLng.lng();
        reporteSenalService.setLat($scope.lat);
        reporteSenalService.setLng($scope.lng);

        var circle = new google.maps.Circle({
          strokeColor: '##063971',
          strokeOpacity: 0.5,
          strokeWeight: 3,
          fillColor: '##063971',
          fillOpacity: 0.1,
          map: map,
          center: latLng ,
          radius: 100,
          clickable: false
        });

        markerPosicion = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: latLng,
          map: map,
          title: 'Hello World!'
        });

        /*evento para el marcador*/
        markerPosicion.addListener('dragend', function() {
          var lat = this.getPosition().lat();
          var lng = this.getPosition().lng();
          if(kilometros(lat,lng,$scope.lat,$scope.lng) > 100){
            markerPosicion.setPosition(latLng);
          }
          else {
            console.log("Lat: "+ lat+" Lon: "+ lng);
            reporteSenalService.setLat(lat);
            reporteSenalService.setLng(lng);
          }
        });

      },7000);


    /*  var latLng = {lat: $scope.lat , lng: $scope.lng };

      map = new google.maps.Map(document.getElementById('map'),{
        zoom: 18,
        center: latLng,
        disableDefaultUI: true,
        scrollwheel: true,
        clickableIcons: false
      });*/




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
