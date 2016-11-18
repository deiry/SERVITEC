var opc = [
  {
    id: 1,
    name: "Bueno"
  },
  {
    id: 2,
    name: "Regular"
  },
  {
    id: 3,
    name: "Malo"
  }
];
var opc2 = [
  {
    id: 1,
    name: "No Visible"
  },
  {
    id: 2,
    name: "Poco visible"
  },
  {
    id: 3,
    name: "Visible"
  }
];

var opc3 = [
  {
    id: 1,
    name:"Retiro",
  },
  {
    id:2,
    name: "Reemplazo"
  },
  {
    id: 3,
    name: "Mantenimiento"
  },
  {
    id:4,
    name: "Inventario"
  },
  {
    id:5,
    name: "Reubicación"
  }
]


angular.module('FormCtrl', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngCordova'])

  .controller('FormCtrl', function ($scope, $cordovaCamera, LatLngMarcador, reporteSenalService, $http, $mdDialog) {
    $scope.urlImg = 'img/senales/';
    $scope.iconSenal="";
    $scope.nameSenal="";
    $scope.categoriaFiltro = '';

    var fecha;


    angular.element(document).ready(function () {
      $scope.getSenalesHttp(1);
      $scope.getSenalesHttp(2);
      $scope.getSenalesHttp(3);
      $scope.getCategoriasHttp();
      //$scope.senalesReglamentaria = reporteSenalService.getSenalesHttp(1,$http);
      $scope.tomarFoto();
    });

    $scope.tomarFoto = function () {
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
    $scope.senales = [];
    /**
     * despliega la vista para seleccionar la señal de transito
     * @param id  tiene el id de la categoria de la señal
     * 1: si es reglamentaria, 2: si es preventiva, 3: si es informativa
     */
    $scope.seleccionCategoria = function (id,name) {
      if (id == 1) {
        $scope.senales = $scope.senalesReglamentaria;
      }
      if (id == 2) {
        $scope.senales = $scope.senalesPreventiva;
      }
      if (id == 3) {
        $scope.senales = $scope.senalesInformativa;
      }
      $('#contenedorTipoSenal').slideDown(400);
      $scope.categoriaFiltro = id;
      reporteSenalService.setCategoria(id);

    };


    //Metodo para guardar la señal que selecciono del contenedor

    $scope.seleccionSenal = function (id,icon,name) {
      reporteSenalService.setIdSenal(id);
      $scope.iconSenal = $scope.urlImg+icon;
      $scope.nameSenal= name;
      $('#contenedorTipoSenal').slideUp(400);
    };

    $scope.seleccionFormulario = function (idOpcmuestra,nameOpc) {
        switch (idOpcmuestra) {
        case 1:
          reporteSenalService.setTablero(nameOpc);
          break;
        case 2:
          reporteSenalService.setPedestal(nameOpc);
          break;
        case 3:
          reporteSenalService.setAnclaje(nameOpc);
          break;
        case 4:
          reporteSenalService.setVisibilidad(nameOpc);
          break;
        case 5:
          reporteSenalService.setAccionTomar((nameOpc));
          break;
      }


    };
    $scope.textObservaciones = null;
    $scope.enviarFormulario = function(){
      console.log($scope.imgURI);
      //reporteSenalService.setFoto($scope.imgURI);
      this.asignarFecha();

      if($scope.textObservaciones == '')
      {
        reporteSenalService.setObservaciones(null);

      }
      else
      {
        reporteSenalService.setObservaciones($scope.textObservaciones);
      }

      reporteSenalService.setObservaciones();
      reporteSenalService.httpReporte($http);
      reporteSenalService.agregarReporte();

      if(reporteSenalService.getRespuesta()== true){
        alert("Enviado correctamente");
      }else{
       alert("Vuelve a intentarlo");
      }

    };

    $scope.showAlert = function(ev, respuesta) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('respuesta')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };


    $scope.asignarFecha = function(){

      fecha = new Date();
      var dia = fecha.getDate();
      var mes = fecha.getMonth()+1;
      var año = fecha.getFullYear();
      var hora = fecha.getHours();
      var min = fecha.getMinutes();
      var seg = fecha.getSeconds();

      if(min<10)
      {
        min = '0'+fecha.getMinutes();
      }

      if(seg<10)
      {
        seg = '0'+fecha.getSeconds();
      }

      if(hora<10)
      {
        hora = '0'+fecha.getHours();
      }

      var fecha = año + '-'+ mes+'-'+dia+' '+hora+':'+min+':'+seg;

      reporteSenalService.setFecha(fecha);
    };
    /**
     * Metodo REST
     * @param id
       */
    $scope.getSenalesHttp = function(id){

     $http.get('http://servitec.ddns.net:8000/servitecserver/index.php/ReportesRest/obtenerSenales/'+id)
        .success(function(data){
          if(id == 1)
          {
            $scope.senalesReglamentaria = data;
          }
          else if(id == 2)
          {
            $scope.senalesPreventiva = data;
          }
          else if(id == 3)
          {
            $scope.senalesInformativa = data;
          }
          else
          {
            console.log('categoria invalida');
          }

          console.log(data);
        })
        .error(function(error){
          alert('error servitec: '+error);
        });
      //console.log($scope.senalesReglamentaria);
    };

    $scope.getCategoriasHttp = function(){

      $http.get('http://servitec.ddns.net:8000/servitecserver/index.php/ReportesRest/obtenerCategorias/')
        .success(function(data){
          $scope.categoriaSenales = data;
          console.log(data);
        })
        .error(function(error){
          alert('error servitec: '+error);
        });
      //console.log($scope.senalesReglamentaria);
    };





    $scope.opcMuestra = [
      {
        id: 1,
        name: "Tablero",
        opc: opc
      },
      {
        id: 2,
        name: "Pedestal",
        opc: opc
      },
      {
        id: 3,
        name: "Anclaje",
        opc: opc
      },
      {
        id: 4,
        name: "Visibilidad",
        opc: opc2
      },
      {
        id: 5,
        name: "Acción a tomar",
        opc: opc3
      }

    ];
    $scope.categoriaSenales = [
      {
        id: null,
        name: null,
        icon: null
      }];

    $scope.senalesReglamentaria = [
      {
        id: null,
        nombre: null,
        img: null,
        categoria: null
      }
    ];
    $scope.senalesPreventiva = [
      {
        id: null,
        nombre: null,
        img: null,
        categoria: null
      }
    ];
    $scope.senalesInformativa = [
      {
        id: null,
        nombre: null,
        img: null,
        categoria: null
      }
    ];
  });


