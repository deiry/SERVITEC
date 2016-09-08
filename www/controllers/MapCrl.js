angular.module('MapCtrl', ['leaflet-directive', 'ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('MapCtrl', function($scope,$cordovaGeolocation){


    /* localizacion del dispositivo gps*/
    var $lat = 40.095;
    var $long = -3.823;
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    var coordenadas = $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function (position){
        $lat  = position.coords.latitude
        $long = position.coords.longitude


        console.log($lat);
        return coordenadas;

      }, function(err) {
        console.log(err)
        // error

      });

      console.log($lat);


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

