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
  }
]


angular.module('FormCtrl', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngCordova'])

  .controller('FormCtrl', function ($scope, $cordovaCamera, LatLngMarcador, reporteSenalService, $http) {

    $scope.categoriaFiltro = '';

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
        id: 1,
        name: "Señal Reglamentaria",
        icon: "hola"
      },
      {
        id: 2,
        name: "Señal Preventiva",
        icon: "hola"
      },
      {
        id: 3,
        name: "Señal Informativa",
        icon: "hola"
      }];



    $scope.senalesReglamentaria = [
      {
        id: 1,
        nombre: "Pare",
        img: "img/senales/sr-01.png",
        categoria: 1
      },
      {
        id: 2,
        nombre: "Ceda el paso",
        img: "img/senales/sr-02.png",
        categoria: 1
      },
      {
        id: 3,
        nombre: "Siga de frente",
        img: "img/senales/sr-03.png",
        categoria: 1
      },
      {
        id: 4,
        nombre: "No pase",
        img: "img/senales/sr-04.png",
        categoria: 1
      },
      {
        id: 5,
        nombre: "05: Giro a la izq. solamente",
        img: "img/senales/sr-05.png",
        categoria: 1
      },
      {
        id: 6,
        nombre: "Prohibido girar a la izq.",
        img: "img/senales/sr-06.png",
        categoria: 1
      },
      {
        id: 1,
        nombre: "Pare",
        img: "img/senales/sr-01.png",
        categoria: 1
      },
      {
        id: 2,
        nombre: "Ceda el paso",
        img: "img/senales/sr-02.png",
        categoria: 1
      },
      {
        id: 3,
        nombre: "Siga de frente",
        img: "img/senales/sr-03.png",
        categoria: 1
      },
      {
        id: 4,
        nombre: "No pase",
        img: "img/senales/sr-04.png",
        categoria: 1
      },
      {
        id: 5,
        nombre: "05: Giro a la izq. solamente",
        img: "img/senales/sr-05.png",
        categoria: 1
      },
      {
        id: 6,
        nombre: "Prohibido girar a la izq.",
        img: "img/senales/sr-06.png",
        categoria: 1
      }
    ]

    $scope.senalesPreventiva = [
      {
        id: 1,
        nombre: "Curva cerrada a la izq.",
        img: "img/senales/sp-01.png",
        categoria: 2
      },
      {
        id: 2,
        nombre: "Curva cerrada a la der.",
        img: "img/senales/sp-02.png",
        categoria: 2

      },
      {
        id: 3,
        nombre: "Curva pronunciada a la izq.",
        img: "img/senales/sp-03.png",
        categoria: 2

      },
      {
        id: 4,
        nombre: "Curva pronunciada a la der.",
        img: "img/senales/sp-04.png",
        categoria: 2

      },
      {
        id: 5,
        nombre: "Curva y contracurva cerrada primera a la izq.",
        img: "img/senales/sp-05.png",
        categoria: 2

      },
      {
        id: 6,
        nombre: "Curva y contracurva cerrada primera a la der.",
        img: "img/senales/sp-06.png",
        categoria: 2
      },
      {
        id: 1,
        nombre: "Curva cerrada a la izq.",
        img: "img/senales/sp-01.png",
        categoria: 2
      },
      {
        id: 2,
        nombre: "Curva cerrada a la der.",
        img: "img/senales/sp-02.png",
        categoria: 2

      },
      {
        id: 3,
        nombre: "Curva pronunciada a la izq.",
        img: "img/senales/sp-03.png",
        categoria: 2

      },
      {
        id: 4,
        nombre: "Curva pronunciada a la der.",
        img: "img/senales/sp-04.png",
        categoria: 2

      },
      {
        id: 5,
        nombre: "Curva y contracurva cerrada primera a la izq.",
        img: "img/senales/sp-05.png",
        categoria: 2

      },
      {
        id: 6,
        nombre: "Curva y contracurva cerrada primera a la der.",
        img: "img/senales/sp-06.png",
        categoria: 2
      }
    ]
    $scope.senalesInformativa = [
      {
        id: 1,
        nombre: "Ruta nacional",
        img: "img/senales/si-01.png",
        categoria: 3
      },
      {
        id: 2,
        nombre: "Ruta departamental",
        img: "img/senales/si-1a.png",
        categoria: 3
      },
      {
        id: 3,
        nombre: "Ruta panamericana",
        img: "img/senales/si-02.png",
        categoria: 3
      },
      {
        id: 4,
        nombre: "Ruta marginal de selva",
        img: "img/senales/si-03.png",
        categoria: 3
      },
      {
        id: 5,
        nombre: "Sitio de parqueo",
        img: "img/senales/si-04.png",
        categoria: 3
      },
      {
        id: 6,
        nombre: "07A: :Zona especial de parqueo",
        img: "img/senales/si-01.png",
        categoria: 3
      },
      {
        id: 7,
        nombre: "Paradero de buses",
        img: "img/senales/si-02.png",
        categoria: 3
      },
      {
        id: 1,
        nombre: "Ruta nacional",
        img: "img/senales/si-01.png",
        categoria: 3
      },
      {
        id: 2,
        nombre: "Ruta departamental",
        img: "img/senales/si-1a.png",
        categoria: 3
      },
      {
        id: 3,
        nombre: "Ruta panamericana",
        img: "img/senales/si-02.png",
        categoria: 3
      },
      {
        id: 4,
        nombre: "Ruta marginal de selva",
        img: "img/senales/si-03.png",
        categoria: 3
      },
      {
        id: 5,
        nombre: "Sitio de parqueo",
        img: "img/senales/si-04.png",
        categoria: 3
      },
      {
        id: 6,
        nombre: "07A: :Zona especial de parqueo",
        img: "img/senales/si-01.png",
        categoria: 3
      },
      {
        id: 7,
        nombre: "Paradero de buses",
        img: "img/senales/si-02.png",
        categoria: 3
      }
    ]
    angular.element(document).ready(function () {
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
      reporteSenalService.setCategoria(name);

    };
  $scope.iconSenal="";
    $scope.nameSenal="";
    //Metodo para guardar la señal que selecciono del contenedor
    $scope.seleccionSenal = function (id,icon,name) {
      reporteSenalService.setIdSenal(id);
      $scope.iconSenal=icon;
      $scope.nameSenal=name;
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
      reporteSenalService.setObservaciones($scope.textObservaciones);
      reporteSenalService.httpReporte($http);
      reporteSenalService.agregarReporte();

    }

  });


