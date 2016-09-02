angular.module('FabCtrl', ['ngMaterial','ngMessages','material.svgAssetsCache'])

  .controller('FabCtrl', function($scope){
    $scope.isOpen = false;
    $scope.demo = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'
    };
  });
