var opc = ["Bueno", "Regular", "Malo"];
var opc2 = ["No Visible", "Poco visible", "Visible"];
angular.module('FormCtrl', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngCordova'])

  .controller('FormCtrl', function ($scope, $cordovaCamera, LatLngMarcador) {
    $scope.opcMuestra = [
      {name: "Tablero", opc: opc, name1: "Pedestal", opc1: opc},
      {name: "Anclaje", opc: opc, name1: "Visibilidad", opc1: opc2},
      {name: "Acción a tomar", opc: opc}
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

    $scope.categoriaFiltro = '';

    $scope.senales = [
      {
        id: 1,
        nombre: "01: Pare",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 2,
        nombre: "02: Ceda el paso",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 3,
        nombre: "03: Siga de frente",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 4,
        nombre: "04: No pase",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 5,
        nombre: "05: Giro a la izq. solamente",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 6,
        nombre: "06: Prohibido girar a la izq.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 1
      },
      {
        id: 1,
        nombre: "01: Curva cerrada a la izq.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2
      },
      {
        id: 2,
        nombre: "02: Curva cerrada a la der.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2

      },
      {
        id: 3,
        nombre: "03: Curva pronunciada a la izq.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2

      },
      {
        id: 4,
        nombre: "04: Curva pronunciada a la der.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2

      },
      {
        id: 5,
        nombre: "05: Curva y contracurva cerrada primera a la izq.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2

      },
      {
        id: 6,
        nombre: "06: Curva y contracurva cerrada primera a la der.",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 2
      },
      {
        id: 1,
        nombre: "01: Ruta nacional",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 2,
        nombre: "01A: Ruta departamental",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 3,
        nombre: "02: Ruta panamericana",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 4,
        nombre: "03: Ruta marginal de selva",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 5,
        nombre: "04: Sitio de parqueo",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 6,
        nombre: "07A: :Zona especial de parqueo",
        img: "img/iconSenalReglamentaria.PNG",
        categoria: 3
      },
      {
        id: 7,
        nombre: "08: Paradero de buses",
        img: "img/iconSenalReglamentaria.PNG",
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
    /**
     * despliega la vista para seleccionar la señal de transito
     * @param id  tiene el id de la categoria de la señal
     * 1: si es reglamentaria, 2: si es preventiva, 3: si es informativa
       */
    $scope.seleccionCategoria = function(id)
    {
      $('#contenedorTipoSenal').slideDown(400);
      $scope.categoriaFiltro = id;
      console.log(id);
    };

    $scope.seleccionSenal = function(id){
      console.log(id);
      $('#contenedorTipoSenal').slideUp(400);
    };

  });
