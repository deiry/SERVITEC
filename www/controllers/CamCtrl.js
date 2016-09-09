angular.module('CamCtrl', ['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])
  .controller('CamCtrl', function($scope, Camera) {

    $scope.takePicture = function (options) {

      var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 1
      };

      Camera.getPicture(options).then(function(imageData) {
        $scope.picture = imageData;
      }, function(err) {
        console.log(err);
      });

    };

    $scope.getPicture = function (options) {

      var options = {
        quality : 75,
        targetWidth: 200,
        targetHeight: 200,
        sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
        $scope.picture = imageData;

      }, function(err) {
        console.log(err);
      });
    };

  })
  .factory('Camera', function($q) {

    return {
      getPicture: function(options) {
        var q = $q.defer();

        navigator.camera.getPicture(function(result) {
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }

  });
