angular.module('MenuCtrl',['ngMaterial'])
.controller('MapCtrl', function($scope){
  $scope.sections = [{
    name:'Deiry sofia Navas',
    type: 'toggle',
    pages:[{
      name: 'Perfil',
      type: 'link',
      icon: 'person'
    },{
      name: 'Configuracion',
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
  }];

  sections.push({
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
  });

  sections.push({
    name: 'Señales realizadas',
    type: 'link',
    templateUrl: 'map.html'
  })

})
