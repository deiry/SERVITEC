angular.module('reporteSenalService', [])
  .service('reporteSenalService',[function ($http)
  {
    var reporte = {
      idSenal: null,
      categoria: null,
      foto: '',
      latitud: null,
      longitud: null,
      tablero: null,
      pedestal: null,
      anclaje: null,
      visibilidad: null,
      observaciones: null
    };

    this.getReporte = function()
    {
      return reporte;
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
      console.log("asigna valor tablero");
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
   // ($idSenal,$lat,$lng,$idTablero,$idPedestal,$idAnclaje,$idVisibolidad,$foto)
    this.httpReporte = function($http)
    {
      $http.post('http://localhost:8080/servitecserver/index.php/ReportesRest/insertarReporte/'+reporte.idSenal+'/'+
      reporte.latitud+'/'+reporte.longitud+'/'+reporte.tablero+'/'+reporte.pedestal+'/'+reporte.anclaje+'/'+
        reporte.visibilidad+'/'+reporte.foto+'/'+reporte.observaciones)
        .success(function(data,status,headers,config){
          console.log(data);
        })
        .error(function(error,status,headers,config){
          console.log(error);
        });
    }



  }
  ]);
