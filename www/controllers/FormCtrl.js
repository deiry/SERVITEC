
angular.module('FormCtrl', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngMdIcons', 'ngCordova','ngCordova'])


  .controller('FormCtrl',function ($scope, $cordovaCamera, LatLngMarcador, reporteSenalService, $http, $mdDialog,
                                   $cordovaFileTransfer,$cordovaFile,$ionicModal)
  {
    $scope.urlServidor = 'http://signalstreet.hol.es';
    $scope.urlImg = 'img/senales/';
    $scope.iconSenal="";
    $scope.nameSenal="";
    $scope.categoriaFiltro = '';
    $scope.senales = null;
    $scope.imgURI = '';
    $scope.formulario = {
      tablero: null,
      pedestal: null,
      anclaje: null,
      visibilidad: null,
      accion: null,
      observaciones: null
    };
    var fecha;


    angular.element(document).ready(function () {
      $scope.getSenalesHttp(1);
      $scope.getSenalesHttp(2);
      $scope.getSenalesHttp(3);
      $scope.getCategoriasHttp();
      $scope.getEstadosHttp();
      $scope.getVisibilidadHttp();
      $scope.getAccionHttp();
      //$scope.senalesReglamentaria = reporteSenalService.getSenalesHttp(1,$http);
      $scope.tomarFoto();
    });

    $scope.tomarFoto = function () {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
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
        $scope.imgURI = /*"data:image/jpeg;base64," +*/ imageData;
        $scope.imageData = imageData;
        LatLngMarcador.img = $scope.imgURI;

      }, function (err) {
        console.log(err);
      });
    };




    $scope.subirFoto = function () {

      var targetPath = $scope.imageData;
      var filename = targetPath.split("/").pop();
      reporteSenalService.setFoto(filename);

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mineType: ":image/jpeg",
        params : {'directory':'img/reportes', 'fileName': filename} // directory represents remote directory,  fileName
      };

      $cordovaFileTransfer.upload($scope.urlServidor+"/index.php/CargarArchivos",targetPath,options).then(function(result){
        console.log("SUCCESS:" + JSON.stringify(result.response));
        reporteSenalService.setFoto(filename);

      },function(error){
        console.log(error);
      });
    };


    $scope.senales = [];
    /**
     * despliega la vista para seleccionar la señal de transito
     * @param id  tiene el id de la categoria de la señal
     * 1: si es reglamentaria, 2: si es preventiva, 3: si es informativa
     */
    $scope.seleccionCategoria = function (id,name) {

      $scope.getSenalesHttp(id);
      $scope.openModal();

    };

/**
Metodo para implementar el modal mostrando las señales de la categoria seleccionada
 */
    $ionicModal.fromTemplateUrl('/templates/modalSenales.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };


    //Metodo para guardar la señal que selecciono del contenedor

    $scope.seleccionSenal = function (id,icon,name) {
      reporteSenalService.setIdSenal(id);
      $scope.iconSenal = $scope.urlImg+icon;
      $scope.nameSenal= name;
      $scope.closeModal();
      //$('#contenedorTipoSenal').slideUp(400);
    };


    $scope.validarFormulario = function()
    {
      if($scope.formulario.accion != null &&
        $scope.formulario.pedestal != null &&
        $scope.formulario.anclaje != null &&
        $scope.formulario.tablero != null &&
        $scope.formulario.visibilidad != null /*&&
        reporteSenalService.getCategoria() != null &&
        reporteSenalService.getLat() != null &&
        reporteSenalService.getLng() != null*/)
      {
        return true;
      }
      else
      {
        return false;
      }

    };

    $scope.enviarFormulario = function(){
      console.log($scope.imgURI);
      $scope.subirFoto();
      if($scope.validarFormulario())
      {
        //reporteSenalService.setFoto($scope.imgURI);
        this.asignarFecha();
        reporteSenalService.setAnclaje($scope.formulario.anclaje);
        reporteSenalService.setTablero($scope.formulario.tablero);
        reporteSenalService.setPedestal($scope.formulario.pedestal);
        reporteSenalService.setVisibilidad($scope.formulario.visibilidad);
        reporteSenalService.setAccionTomar($scope.formulario.accion);


        if($scope.formulario.observaciones == '')
        {
          reporteSenalService.setObservaciones(null);

        }
        else
        {
          reporteSenalService.setObservaciones($scope.formulario.observaciones);
        }

        reporteSenalService.httpReporte($http);
        reporteSenalService.agregarReporte();

        if(reporteSenalService.getRespuesta()== true){
          alert("Enviado correctamente");
        }else{
          alert("Vuelve a intentarlo");
        }
      }
      else
      {
        console.log('error al validar el formulario');
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

      $http.get($scope.urlServidor+'/index.php/ReportesRest/obtenerSenales/'+id)
        .success(function(data){
          /*if(id == 1)
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
*/
          $scope.senales = data;
          console.log(data);
        })
        .error(function(error){
          console.log('error servitec: '+error);
        });
      //console.log($scope.senalesReglamentaria);
    };

    $scope.getCategoriasHttp = function(){

      $http.get($scope.urlServidor+'/index.php/ReportesRest/obtenerCategorias/')
        .success(function(data){
          $scope.categoriaSenales = data;
          //console.log(data);
        })
        .error(function(error){
          console.log('error servitec: '+error);
        });
      //console.log($scope.senalesReglamentaria);
    };

    $scope.getEstadosHttp = function()
    {
      $http.get($scope.urlServidor+'/index.php/ReportesRest/obtenerEstados/')
        .success(function(data){
          $scope.estados = data;
         // console.log(data);
        })
        .error(function(error){
          console.log('error servitec: '+error);
        });
    };

    $scope.getVisibilidadHttp = function()
    {
      $http.get($scope.urlServidor+'/index.php/ReportesRest/obtenerVisibilidad/')
        .success(function(data){
          $scope.visibilidad = data;
          //console.log(data);
        })
        .error(function(error){
          console.log('error servitec: '+error);
        });
    };

    $scope.getAccionHttp = function()
    {
      $http.get($scope.urlServidor+'/index.php/ReportesRest/obtenerAccion/')
        .success(function(data){
          $scope.accion = data;
          //console.log(data);
        })
        .error(function(error){
          console.log('error servitec: '+error);
        });
    };


  });



