angular.module('CamCtrl', ['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])
  .controller('CamCtrl', function($scope, $cordovaCamera) {

    angular.element(document).ready(function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
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

