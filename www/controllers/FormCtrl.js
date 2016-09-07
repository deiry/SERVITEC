var opc = ["Visible", "Regular", "No visible"];
angular.module('FormCtrl',[])

.controller('FormCtrl', function($scope){
 $scope.opcMuestra = [
   {name: "Tablero", opc : opc},
   {name: "Pedestal",opc : opc},
   {name: "Anclaje", opc : opc},
   {name: "Visibilidad", opc : opc},
   {name: "Acción a tomar",opc : opc}
 ]
  
});
