import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient, private route: Router) { }


  /**
   * Crea un nuevo ticket mediante una solicitud HTTP POST.
   *
   * @param ticket - Los datos del ticket que se desea crear.
   * @returns Un observable que emite la respuesta de la solicitud de creación.
   */
  createTicket(ticket: any): Observable<any> {
    const url = environment.apiUrl + 'tickets/api/ticket/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, ticket, { headers })
  }




  /**
   * Crea una nueva tarea mediante una solicitud HTTP POST.
   *
   * @param tarea - Los datos de la tarea que se desea crear.
   * @returns Un observable que emite la respuesta de la solicitud de creación.
   */
  crearTarea(tarea: any): Observable<any> {
    const url = environment.apiUrl + 'tasks/api/tareas/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, tarea, { headers })
  }




  /**
  * Crea una nueva actividad de seguimiento mediante una solicitud HTTP POST.
  *
  * @param actividad - Los datos de la actividad de seguimiento que se desea crear.
  * @returns Un observable que emite la respuesta de la solicitud de creación.
  */
  crearActividad(actividad: any): Observable<any> {
    const url = environment.apiUrl + 'trackers/api/seguimientostareas/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, actividad, { headers })
  }





  /**
   * Guarda una resolución mediante una solicitud HTTP POST.
   *
   * @param resolucion - Los datos de la resolución que se desea guardar.
   * @returns Un observable que emite la respuesta de la solicitud de guardado.
   */
  guardarResolucion(resolucion: any): Observable<any> {
    const url = environment.apiUrl + 'resolvers/api/resoluciones/'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, resolucion, { headers })
  }





  /**
   * Obtiene las actividades de seguimiento por el ID de la tarea.
   *
   * @param idtarea - El ID de la tarea para la que se desean obtener actividades de seguimiento.
   * @returns Un observable que emite la lista de actividades de seguimiento.
   */
  getActividadesxId(idtarea: any) {
    return this.http.get(`${environment.apiUrl}trackers/seguimientotareaslist/?idtarea=${idtarea}`).pipe(
      map(res => res)
    );
  }



  /**
   * Actualiza una tarea mediante una solicitud HTTP PUT.
   *
   * @param tarea - Los datos actualizados de la tarea.
   * @param idtarea - El ID de la tarea que se desea actualizar.
   * @returns Un observable que emite la respuesta de la solicitud de actualización.
   */
  updateTarea(tarea: any, idtarea: any) {

    return this.http.put(`${environment.apiUrl}tasks/api/tareas/${idtarea}/`, tarea).pipe(
      map((resp: any) => resp)
    );

  }



  /**
  * Obtiene las clasificaciones de resoluciones mediante una solicitud HTTP GET.
  *
  * @returns Un observable que emite la lista de clasificaciones de resoluciones.
  */
  getClasificacionesResoluciones(): Observable<any> {
    return this.http.get(environment.apiUrl + 'resolvers/api/clasificacionesresoluciones/').pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene los tipos de resoluciones mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de resoluciones.
   */
  getTipoResoluciones(): Observable<any> {
    return this.http.get(environment.apiUrl + 'resolvers/api/tiporesoluciones/').pipe(
      map(res => res)
    );
  }




  /**
   * Registra una tarea en una vista mediante una solicitud HTTP POST.
   *
   * @param tarea - Los datos de la tarea con color que se desean enviar.
   * @returns Un observable que emite la respuesta de la solicitud de envío.
   */
  enviarTareaColor(tarea: any) {
    const url = environment.apiUrl + 'tasks/api/colours/'

    return this.http.post(url, tarea).pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene todos los tickets desde de una vista mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de todos los tickets.
   */
  get_all_vtickets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}tasks/vtareas/`).pipe(
      map((resp: any) => resp)
    );
  }




  /**
   * Obtiene todas las tareas desde una vista llamada vtareaestadocolor que contiene estados y colores mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tareas con estados y colores.
   */
  getAllTareasEstadoColor(): Observable<any> {
    return this.http.get(`${environment.apiUrl}tasks/vtareaestadocolor/`).pipe(
      map((resp: any) => resp)
    );
  }



  /**
     * Sube un archivo PDF mediante una solicitud HTTP POST.
     *
     * @param formData - Los datos en un objeto tipo formData que contienen el archivo PDF a subir.
     * @returns Un observable que emite la respuesta de la solicitud de subida de archivo.
     */


  subirPDF(formData: FormData): Observable<any> {
    const url = `${environment.apiUrl}tasks/createarchivos/`;
  
    return this.http.post(url, formData).pipe(
      map(res => res)
    );
  }
  
  
/**
   * Obtiene una lista de archivos por el ID de la tarea mediante una solicitud HTTP GET.
   *
   * @param idtarea - El ID de la tarea para la que se desean obtener archivos.
   * @returns Un observable que emite la lista de archivos relacionados con la tarea.
   */
  obtenerArchivosListXId(idtarea: any) {
    return this.http.get(`${environment.apiUrl}tasks/archivoslist/?idtarea=${idtarea}`).pipe(
      map(res => res)
    );
  }

  downloadReporte(idtarea: any): Observable<Blob> {
    const url = `${environment.apiUrl}reports/generate_pdf/${idtarea}/`;
    return this.http.get(url, { responseType: 'blob' });
  }



  /**
   * Obtiene los archivos por su ID mediante una solicitud HTTP GET.
   *
   * @param idarchivo - El ID del archivo que se desea obtener.
   * @returns Un observable que emite los archivos correspondientes al ID.
   */
  getArchivos(idarchivo: any) {
    return this.http.get(`${environment.apiUrl}tasks/getarchivos/${idarchivo}/`).pipe(
      map(res => res)
    );
  }




  /**
   * Genera un reporte en formato PDF por el ID de la tarea mediante una solicitud HTTP GET.
   *
   * @param idtarea - El ID de la tarea para la que se desea generar el reporte en PDF.
   * @returns Un observable que emite el reporte en formato PDF.
   */ 
  obtenerReporte(idtarea: any) {
    return this.http.get(`${environment.apiUrl}reports/generate_pdf/${idtarea}/`).pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene una lista de archivos por el ID de la tarea mediante una solicitud HTTP GET.
   *
   * @param idtarea - El ID de la tarea para la que se desean obtener archivos.
   * @returns Un observable que emite la lista de archivos relacionados con la tarea.
   */
  obtenerArchivosXId(idtarea: any) {
    return this.http.get(`${environment.apiUrl}tasks/archivoslist/?idtarea=${idtarea}`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene tareas filtradas por el ID del usuario asignado y el ID del estado mediante una solicitud HTTP GET.
   *
   * @param userId - El ID del usuario asignado.
   * @param idEstado - El ID del estado de las tareas.
   * @returns Un observable que emite las tareas que cumplen con los criterios de filtrado.
   */
  obtenerFiltroTarea(userId: any, idEstado: any) {
    return this.http.get(`${environment.apiUrl}tasks/filtered_tickets/?idusuarioasignado__idusuario=${userId}&idestado__idestado=${idEstado}`).pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene tareas por indicador y usuario asignado mediante una solicitud HTTP GET.
   *
   * @param indicador - El indicador de las tareas.
   * @param userId - El ID del usuario asignado.
   * @returns Un observable que emite las tareas que cumplen con los criterios de filtrado.
   */
  obtenerVtareasXidcreador(indicador: any, userId: any) {
    return this.http.get(`${environment.apiUrl}tasks/vtareas/?indicador=${indicador}&idcreador=${userId}`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene tareas por estado mediante una solicitud HTTP GET.
   *
   * @param estado - El estado de las tareas.
   * @returns Un observable que emite las tareas que tienen el estado especificado.
   */
  obtenerVtareasXEstado(estado: any, indicador: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}tasks/vtareas/?estado=${estado}&indicador=${indicador}`).pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene tareas por indicador y por ID del técnico asignado mediante una solicitud HTTP GET.
   *
   * @param indicador - El indicador de las tareas.
   * @param tecnicoId - El ID del técnico asignado.
   * @returns Un observable que emite las tareas que cumplen con los criterios de filtrado.
   */
  obtenerVtareasXIndicadorAsignado(indicador: any, tecnicoId: any) {
    return this.http.get(`${environment.apiUrl}tasks/vtareas/?indicador=${indicador}&idtecnico=${tecnicoId}`).pipe(
      map(res => res)
    );
  }



  /**
   * Obtiene tareas asignadas a un usuario por estado mediante una solicitud HTTP GET.
   *
   * @param userId - El ID del usuario asignado.
   * @param estado - El estado de las tareas.
   * @returns Un observable que emite las tareas asignadas al usuario con el estado especificado.
   */
  obtenerVtareasAsignado(userId: any, estado: any) {
    return this.http.get(`${environment.apiUrl}tasks/vtareas/?estado=${estado}&idtecnico=${userId}`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene reportes mediante una solicitud HTTP GET con un rango de fechas.
   *
   * @param fechaInicio - La fecha de inicio del rango.
   * @param fechaFinal - La fecha final del rango.
   * @returns Un observable que emite los reportes dentro del rango de fechas especificado.
   */
  obtenerReportesVista(fechaInicio: any, fechaFinal: any) {

    return this.http.get(`${environment.apiUrl}reports/cobrosindebiostable/?fecha_inicio=${fechaInicio}&fecha_final=${fechaFinal}`).pipe(
      map(res => res)
    );
  }



  /**
   * Descarga un reporte en formato XML mediante una solicitud HTTP GET con un rango de fechas y retorna un blob.
   *
   * @param fechaInicio - La fecha de inicio del rango.
   * @param fechaFinal - La fecha final del rango.
   * @returns Un observable que emite un blob correspondiente al archivo descargado.
   */
  downloadFile(fechaInicio: any, fechaFinal: any): Observable<Blob> {
    const apiUrl = `${environment.apiUrl}reports/cobrosindebidos/?fecha_inicio=${fechaInicio}&fecha_final=${fechaFinal}`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }




  /**
   * Obtiene subtareas filtradas por el ID del usuario asignado, el ID del estado y el indicador mediante una solicitud HTTP GET.
   *
   * @param userId - El ID del usuario asignado.
   * @param idEstado - El ID del estado de las tareas.
   * @param indicador - El indicador de las tareas.
   * @returns Un observable que emite las tareas que cumplen con los criterios de filtrado.
   */
  obtenerFiltroSubtareas(userId: any, idEstado: any, indicador: any) {
    return this.http.get(`${environment.apiUrl}tasks/filtered_tickets/?idusuarioasignado__idusuario=${userId}&idestado__idestado=${idEstado}&indicador=${indicador}`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene el objeto de un ticket por su ID mediante una solicitud HTTP GET.
   *
   * @param ticketId - El ID del ticket que se desea obtener.
   * @returns Un observable que emite el ticket correspondiente al ID.
   */
  obtenerTicketId(ticketId: any) {
    return this.http.get(`${environment.apiUrl}tickets/api/ticket/${ticketId}/`).pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene tareas desde una vista por usuario asignado mediante una solicitud HTTP GET.
   *
   * @param userId - El ID del usuario asignado.
   * @returns Un observable que emite las tareas con estados y colores asignadas al usuario.
   */
  obtenerTareaEstadoColor(userId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}tasks/vtareaestadocolor/?id_asignado=${userId}`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene el objeto de una tarea por su ID mediante una solicitud HTTP GET.
   *
   * @param tareaId - El ID de la tarea que se desea obtener.
   * @returns Un observable que emite la tarea correspondiente al ID.
   */
  obtenerTareaId(tareaId: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}tasks/api/tareas/${tareaId}/`).pipe(
      map(res => res)
    );
  }




  /**
   * Obtiene la lista de canales de recepción de tickets mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de canales de recepción.
   */
  getCanalesRecepciones(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/canalesrecepciones/').pipe(
      map(res => res)
    );

  }



  /**
   * Obtiene la lista de clases de tarjetas mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de clases de tarjetas.
   */
  getClasesTarjetas(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/clasestarjetas/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de tipos de productos mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de productos.
   */
  getTiposProductos(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tiposproductos/').pipe(
      map(res => res)
    );

  }





   /**
   * Obtiene la lista de conceptos mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de conceptos.
   */
  getConceptos(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/conceptos/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de marcas de tarjetas mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de marcas de tarjetas.
   */
  getMarcasTarjetas(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/marcastarjetas/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de prioridades mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de prioridades.
   */
  getPrioridades(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/prioridades/').pipe(
      map(res => res)
    );

  }





  /**
   * Obtiene la lista de tarjetas mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tarjetas.
   */
  getTarjetas(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tarjetas/').pipe(
      map(res => res)
    );

  }



  /**
   * Obtiene la lista de tipos de tickets -reclamos-  mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de tickets.
   */
  getTicketTipos(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tickettipos/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de tipos de comentarios mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de comentarios.
   */
  getTiposComentarios(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tiposcomentarios/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de tipos de tarjetas mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de tarjetas.
   */
  getTiposTarjetas(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tipostarjetas/').pipe(
      map(res => res)
    );

  }



/**
   * Obtiene la lista de tipos de transacciones mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de tipos de transacciones.
   */
  getTiposTransacciones(): Observable<any> {
    return this.http.get(environment.apiUrl + 'tickets/api/tipostransacciones/').pipe(
      map(res => res)
    );

  }




  /**
   * Obtiene la lista de todos los tickets desde una api mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de todos los tickets.
   */
  get_all_tickets(): Observable<any> {
    const url = `${environment.apiUrl}tickets/api/ticket/`;
    return this.http.get(url).pipe(
      map((resp: any) => resp)
    );
  }



  /**
   * Obtiene la lista de todas las tareas desde un api mediante una solicitud HTTP GET.
   *
   * @returns Un observable que emite la lista de todas las tareas.
   */
  get_all_tareas(): Observable<any> {
    const url = `${environment.apiUrl}tasks/api/tareas/`;
    return this.http.get(url).pipe(
      map((resp: any) => resp)
    );
  }

  getrejectedTasksByUser(idUser:any){
    return this.http.get(`${environment.apiUrl}tasks/rejectedTasksByUser/?idasignador=${idUser}`)
    .pipe(map(response => {
      return response;
    }));
  }

  getAllTicketsFilter(sucursal:any){
    return this.http.get(`${environment.apiUrl}tasks/allTasks/?sucursal=${sucursal}`)
    .pipe(map(response => {
      return response;
    }));
  }
  // downloadTicketsExcel(sucursal:any, dateInicio:any, dateFin:any){
  //   return this.http.get(`${environment.apiUrl}tasks/generateExcel/?sucursal=${sucursal}&start_date=${dateInicio}&end_date=${dateFin}`)
  //   .pipe(map(response => {
  //     return response;
  //   }));
  // }

  downloadTicketsExcel(sucursal: any, dateInicio: any, dateFin: any): Observable<Blob> {
    const apiUrl = `${environment.apiUrl}tasks/generateExcel/?sucursal=${sucursal}&start_date=${dateInicio}&end_date=${dateFin}`;
    return this.http.get(apiUrl, { responseType: 'blob' });
  }
}
