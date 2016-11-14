angular.module('MapCtrl', ['ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation, LatLngMarcador, reporteSenalService, $timeout, $http){
    $scope.lat = 6.2518;
    $scope.lng = -75.5636;
    var map;
    var markerPosicion;
    var latLng;

    $scope.reportes = [
      {
        id_reporte: 1,
        id_senal: 1,
        latitud: 6.28550001 ,
        longitud: -75.603338 ,
        fecha: '2016-11-14 12-04-25',
        foto: '',
        tablero: '',
        pedestal: '',
        anclaje: '',
        visibilidad: '',
        observaciones: '',
        accionTomar: '',
        id_categoria: 0
      }
    ];


    angular.element(document).ready(function ()
    {
      //$scope.getReportes();
      latLng = new google.maps.LatLng({lat: $scope.lat, lng: $scope.lng});
      $scope.mostrarMapa();

      //$scope.crearMarcador($scope.reportes);

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
          //console.log(latLng);
          map.setCenter(latLng);

        }, function(err) {
          // error
        });

      $http.get('http://servitec.ddns.net:8000/servitecserver/index.php/ReportesRest/obtenerReportes')
        .success(function(data,status,headers,config){
          $scope.reportes = data;
        //  console.log($scope.reportes);
        })
        .error(function(error,status,headers,config){
          console.log(error);
        });
      //console.log($scope.reportes);

      $timeout(function(){

        latLng = map.getCenter();

        $scope.lat = latLng.lat();
        $scope.lng = latLng.lng();
        reporteSenalService.setLat($scope.lat);
        reporteSenalService.setLng($scope.lng);

        var image = {
          url: 'img/iconAgente.png',
          // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new google.maps.Size(40, 57),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(20, 60)
        };

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
          icon: image,
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
            reporteSenalService.setLat(lat);
            reporteSenalService.setLng(lng);
          }
        });

        $scope.crearMarcadores($scope.reportes);
      },7000);

      $scope.crearMarcadores = function(reportes){
          for(var i = 0; i< reportes.length;i++)
          {
            $scope.crearMarcador(reportes[i]);
          }
      };

      $scope.crearMarcador= function(reporte)
      {
        var lat = parseFloat(reporte.latitud);
        var lng = parseFloat(reporte.longitud);

        //console.log(lat + lng);



        var latlon = new google.maps.LatLng({lat: lat, lng: lng});
        var marcador = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: latlon,
          map: map,
          title: reporte.id_reporte});
      };

      $scope.getReportes = function()
      {
        $http.get('http://servitec.ddns.net:8000/servitecserver/index.php/ReportesRest/obtenerReportes')
          .success(function(data,status,headers,config){
            $scope.reportes = data;
          })
          .error(function(error,status,headers,config){
            console.log(error);
          });
          console.log($scope.reportes);
      }


    };


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
