var opc = ["Bueno", "Regular", "Malo"];
var opc2 = ["No Visible", "Poco visible", "Visible"];
angular.module('FormCtrl',['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('FormCtrl', function($scope, $cordovaCamera, LatLngMarcador){
    $scope.opcMuestra = [
      {name: "Tablero", opc : opc,
        name2: "Pedestal",opc2 : opc},
      {name: "Anclaje", opc : opc,
         name2: "Visibilidad", opc2 : opc2}
    ];

    angular.element(document).ready(function () {
     $scope.tomarFoto();
    });

    $scope.tomarFoto = function(){
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        targetWidth: 1152,
        targetHeight: 2048,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        LatLngMarcador.img = $scope.imgURI;

      }, function (err) {
        alert(err);
      });
    };

  });
