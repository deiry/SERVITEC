var opc = ["Visible", "Regular", "No visible"];
angular.module('FormCtrl',['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('FormCtrl', function($scope, $cordovaCamera){
    $scope.opcMuestra = [
      {name: "Tablero", opc : opc, name1: "Pedestal",opc1 : opc},
      {name: "Anclaje", opc : opc, name1: "Visibilidad", opc1 : opc},
      {name: "Acción a tomar",opc : opc}
    ];

    angular.element(document).ready(function () {
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
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
    });

  });
