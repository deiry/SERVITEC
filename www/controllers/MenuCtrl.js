angular.module('MenuCtrl',['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons']).config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet("call", 'img/icons/sets/communication-icons.svg', 24)
      .iconSet("social", 'img/icons/sets/social-icons.svg', 24);
  })
.controller('MenuCtrl', function($scope,$mdDialog) {

  $scope.sections = [ {
    name:'Perfil',
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


  };
  var vm = this;

  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };

});
