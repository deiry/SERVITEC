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
    /**
     * despliega la vista para seleccionar la señal de transito
     * @param id  tiene el id de la categoria de la señal
     * 1: si es reglamentaria, 2: si es preventiva, 3: si es informativa
       */
    $scope.seleccionCategoria = function(id)
    {
      $('#contenedorTipoSenal').slideDown(400);
      $scope.categoriaFiltro = id;
      console.log("Categoria"+$scope.categoriaFiltro);
    };

    $scope.seleccionSenal = function(id){
      console.log("Señal"+id+"");
      $('#contenedorTipoSenal').slideUp(400);
    };

  });
