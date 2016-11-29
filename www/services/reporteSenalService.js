angular.module('reporteSenalService', [])
  .service('reporteSenalService',[function ($http)
  {
    var respuesta;
    var reportes = [];
    var index=0;
    var reporte = {
      idSenal: null,
      categoria: null,
      foto: null,
      latitud: null,
      longitud: null,
      tablero: null,
      pedestal: null,
      anclaje: null,
      visibilidad: null,
      accionTomar: null,
      observaciones: null,
      fecha: null
    };

    this.getReporte = function()
    {
      return reporte;
    };

    this.setReportes = function(rep){
      reportes = rep;
    };

    this.setIdSenal = function(idSenal){
      reporte.idSenal = idSenal;
    };
    this.getIdSenal = function(){
      return reporte.idSenal;
    };

    this.setCategoria = function(cat){
      reporte.categoria = cat;
    };
    this.getCategoria = function(){
      return reporte.categoria;
    };

    this.setTablero = function(tab){
      reporte.tablero = tab;
    };
    this.getTablero = function(){
      return reporte.tablero;
    };

    this.setFoto = function(foto){
      reporte.foto = foto;
      console.log("asigna valor tablero");
    };
    this.getFoto = function(){
      return reporte.foto;
    };


    this.setLat = function(lat){
      reporte.latitud = lat;
    };
    this.getLat = function(){
      return reporte.latitud;
    };


    this.setLng = function(lng){
      reporte.longitud = lng;
    };
    this.getLng = function(){
      return reporte.longitud;
    };


    this.setPedestal = function(pedestal){
      reporte.pedestal = pedestal;
    };
    this.getPedestal = function(){
      return reporte.pedestal;
    };


    this.setAnclaje = function(anclaje){
      reporte.anclaje = anclaje;
    };
    this.getAnclaje = function(){
      return reporte.anclaje;
    };


    this.setVisibilidad = function(visibilidad){
      reporte.visibilidad = visibilidad;
    };
    this.getVisibilidad = function(){
      return reporte.visibilidad;
    };

    this.setObservaciones = function(obs){
      reporte.observaciones = obs;
    };
    this.getObservaciones = function(){
      return reporte.observaciones;
    };

    this.setAccionTomar = function(acc){
      reporte.accionTomar = acc;
    };
    this.getAccionTomar = function(){
      return reporte.accionTomar;
    };


    this.setFecha = function(fec){
      reporte.fecha = fec;
    };
    this.getFecha = function(){
      return reporte.fecha;
    };


   // ($idSenal,$lat,$lng,$idTablero,$idPedestal,$idAnclaje,$idVisibolidad,$foto)
    this.httpReporte = function($http)
    {

      var strReporte = reporte.idSenal+'/'+reporte.latitud+'/'+reporte.longitud+'/'+reporte.tablero+'/'+reporte.pedestal+'/'+reporte.anclaje+'/'+
        reporte.visibilidad+'/'+reporte.foto+'/'+reporte.observaciones+'/'+reporte.accionTomar+'/'+reporte.categoria+'/'+reporte.fecha;

      console.log(strReporte);
      $http.post('http://signalstreet.net/index.php/ReportesRest/insertarReporte/'+strReporte)
        .success(function(data,status,headers,config){
          respuesta = true;
          console.log(data);

        })
        .error(function(error,status,headers,config){
          respuesta = false;
          console.log(error);
        });
    };

    this.getRespuesta = function(){
      return respuesta;
    }

    this.agregarReporte= function(){
      reportes.push(reporte);
      console.log(reportes)
    }

  }
  ]);
