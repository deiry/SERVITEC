angular.module('MenuCtrl',['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons'])
.controller('MenuCtrl', function($scope) {

  $scope.sections = [ {
    name:'Deiry sofia Navas',
    type: 'toggle',
    pages:[
      {name: 'Perfil',
      type: 'link',
      icon: 'person'
      },
      {name: 'Configuracion',
      type: 'link',
      icon: 'settings'
      },{
      name: 'Ayuda',
      type: 'link',
      icon:  'help'
    },{
      name: 'Exit',
      type: 'link',
      icon: 'logout'
    }]
  },{
    name: 'Historial',
    type: 'toggle',
    pages: [{
      name: 'Fecha',
      type: 'link',
      icon: 'date_range',
      templateUrl: 'formulario.html'
    }, {
      name: 'Prioridad',
      type: 'link',
      icon: 'star_rate'
    },{
      name: 'Todas señales',
      type: 'link',
      icon: 'list'
    }]
  }];
  $scope.collapseAll = function(data) {
    for(var i in $scope.sections) {
      if($scope.sections[i] != data) {
        $scope.sections[i].expanded = false;
      }
    }
    data.expanded  = !data.expanded;
  };


});
