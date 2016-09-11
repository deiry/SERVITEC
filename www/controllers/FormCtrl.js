var opc = ["Visible", "Regular", "No visible"];
angular.module('FormCtrl',[])

  .controller('FormCtrl', function($scope){
    $scope.opcMuestra = [
      {name: "Tablero", opc : opc, name1: "Pedestal",opc1 : opc},
      {name: "Anclaje", opc : opc, name1: "Visibilidad", opc1 : opc},
      {name: "Acción a tomar",opc : opc}
    ]

  });
