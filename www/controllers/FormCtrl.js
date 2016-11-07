var opc = ["Bueno", "Regular", "Malo"];
var opc2 = ["No Visible", "Poco visible", "Visible"];
angular.module('FormCtrl',['ngMaterial','ngMessages', 'material.svgAssetsCache','ngMdIcons','ngCordova'])

  .controller('FormCtrl', function($scope, $cordovaCamera, LatLngMarcador){
    $scope.opcMuestra = [
      {name: "Tablero", opc : opc,
        name2: "Pedestal",opc2 : opc},
      {name: "Anclaje", opc : opc,
         name2: "Visibilidad", opc2 : opc2}
    ];
        $scope.categoria =[
            {
              name: "Señal Reglamentaria",
              icon:"hola"
            },
            {
                name: "Señal Preventiva",
                icon:"hola"
            },
            {
                name: "Señal Informativa",
                icon:"hola"
            }];

        $scope.SR= [{
            "01": {
                "nombre": "01: Pare",
                    "icon": "hola"
            },
            "02": {
                "nombre": "02: Ceda el paso",
                    "icon": "hola"
            },
            "03": {
                "nombre": "03: Siga de frente",
                    "icon": "hola"
            },
            "04": {
                "nombre": "04: No pase",
                    "icon": "hola"
            },
            "05": {
                "nombre": "05: Giro a la izq. solamente",
                    "icon": "hola"
            },
            "06": {
                "nombre": "06: Prohibido girar a la izq.",
                    "icon": "hola"
            }
        }]

        $scope.SP= [{
            "01": {
                "nombre": "01: Curva cerrada a la izq.",
                "icon": "hola"
            },
            "02": {
                "nombre": "02: Curva cerrada a la der.",
                "icon": "hola"
            },
            "03": {
                "nombre": "03: Curva pronunciada a la izq.",
                "icon": "hola"
            },
            "04": {
                "nombre": "04: Curva pronunciada a la der.",
                "icon": "hola"
            },
            "05": {
                "nombre": "05: Curva y contracurva cerrada primera a la izq.",
                "icon": "hola"
            },
            "06": {
                "nombre": "06: Curva y contracurva cerrada primera a la der.",
                "icon": "hola"
            }
        }]

    angular.element(document).ready(function () {
     $scope.tomarFoto();
    });

    $scope.tomarFoto = function(){
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

  });
