angular.module('reporteSenalService', [])
  .service('reporteSenalService',[function ($http)
  {
    var reporte = {
      idSenal: null,
      foto: '',
      latitud: null,
      longitud: null,
      tablero: null,
      pedestal: null,
      anclaje: null,
      visibilidad: null
    };

    this.setIdSenal = function(idSenal){
      reporte.idSenal = idSenal;
    };
    this.getIdSenal = function(){
      return reporte.idSenal;
    };


    this.setFoto = function(foto){
      reporte.foto = foto;
    };
    this.setFoto = function(){
      return reporte.foto;
    };


    this.setLat = function(lat){
      reporte.latitud = lat;
    };
    this.setLat = function(){
      return reporte.latitud;
    };


    this.setLng = function(lng){
      reporte.longitud = lng;
    };
    this.setLng = function(){
      return reporte.longitud;
    };


    this.setTablero = function(tablero){
      reporte.tablero = tablero;
    };
    this.setTablero = function(){
      return reporte.tablero;
    };


    this.setPedestal = function(pedestal){
      reporte.pedestal = pedestal;
    };
    this.setPedestal = function(){
      return reporte.pedestal;
    };


    this.setAnclaje = function(anclaje){
      reporte.anclaje = anclaje;
    };
    this.setAnclaje = function(){
      return reporte.anclaje;
    };


    this.setVisibilidad = function(visibilidad){
      reporte.visibilidad = visibilidad;
    };
    this.setVisibilidad = function(){
      return reporte.visibilidad;
    };

    this.httpReporte = function()
    {
      
    }



  }
  ]);
