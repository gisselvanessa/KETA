import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Route, Router } from '@angular/router';
import { Observable, interval,map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public currentNotifications: any[] = [];
  private notificacionesMostradas = false;
  public socket: any;
  constructor(private http: HttpClient, private route:Router, private messageservice: MessageService) {}

  /**
   * Obtiene las notificaciones de un usuario por su ID.
   *
   * @param idUsuario - El ID del usuario para el que se desean obtener notificaciones.
   * @returns Un observable que realiza sondeos cada 5 segundos para obtener las notificaciones.
   */
  obtenerNotificacionesXId(idUsuario: any): Observable<any> {

    return interval(5000).pipe(

      switchMap(() =>

        this.http.get(`${environment.apiUrl}trackers/notificacioneslist/?idusuario=${idUsuario}`)
      
        )
    );
  }


  
  /**
   * Notifica al usuario sobre nuevas notificaciones y actualiza la lista de notificaciones actuales.
   *
   * @param nuevasNotificaciones - Nuevas notificaciones que se desean notificar.
   */ 
  notificarNuevasNotificaciones(nuevasNotificaciones: any[]) {


    const newNotifications = nuevasNotificaciones.filter(
      (notification) => !this.currentNotifications.some((n) => n.idnotificacion === notification.idnotificacion)
      );

      if (newNotifications.length > 0) {
      
      this.messageservice.add({ severity: 'info', summary: 'Notificaciones', detail: 'Tienes nuevas notificaciones' });

    }

    this.currentNotifications = nuevasNotificaciones;
  }



  
  /**
   * Limpia la lista de notificaciones actuales.
   */
  limpiarVariable(){
    
    this.currentNotifications = [];

  }
  



  /**
   * Actualiza una notificación existente mediante una solicitud HTTP PATCH.
   *
   * @param idNotificacion - El ID de la notificación que se desea actualizar.
   * @param notification - La información actualizada de la notificación.
   * @returns Un observable que emite la respuesta de la solicitud de actualización.
   */
  updateNotificacion(idNotificacion: any, notification: any): Observable<any> {

    return this.http

      .patch(`${environment.apiUrl}trackers/notificacioneslist/?idnotificacion=${idNotificacion}`, notification)

      .pipe(

        map((resp: any) => resp)

      );
  }
}

