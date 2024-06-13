import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../moduleusers/services/auth.service';
import { Router } from '@angular/router';
import { Subject, firstValueFrom } from 'rxjs';
import { UserService } from '../../moduleusers/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { format } from 'date-fns';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.css']
})
export class TecnicoComponent implements OnInit {

  // Se crea menuItems que contenga las rutas en el sidebar

  menuItems: any[] = [

    {

      label: 'Dashboard',
      icon: 'pi pi-th-large',
      routerLink: ['/tecnico-ticket/dashboard/ticket-table']
      
    },

    {

      label: 'Usuarios',
      icon: 'pi pi-users',
      items: [

        { label: 'Lista de usuarios', icon: 'pi pi-list', routerLink: ['/tecnico-ticket/list-users'] }
      
      ]
    },
    {

      label: 'Mi Perfil',
      icon: 'fa-regular fa-id-badge',
      routerLink: ['/tecnico-ticket/profile']

    },
  ];

  showNotification: boolean = false;

  notifications: any = [];

  notificationsBadge: any = [];

  usuario: any = {}

  usuarioLoggeado: string = "";

  stopEventPropagation: boolean = false;
  
  private destroy$ = new Subject<void>();




  constructor(

    private authservice:AuthService, 

    private route: Router, 

    private userService: UserService,

    private notificationsservice: NotificationsService,

    ) { }



  async ngOnInit() {

    this.usuario = await firstValueFrom(this.userService.get_usuario(String(localStorage.getItem('user'))))

    this.usuarioLoggeado = this.usuario.first_name + ' ' + this.usuario.last_name;

    await this.getNotificaciones();

  }



  ngOnDestroy() {

    // Cuando el componente se destruye (por ejemplo, cuando el usuario cierra la pestaña o el componente se elimina), se completa el Subject

    this.destroy$.next();

    this.destroy$.complete();

  }


  /**
   * Obtiene las notificaciones del usuario y las muestra en tiempo real.
   */
  async getNotificaciones() {

    this.notificationsservice.obtenerNotificacionesXId(this.usuario.idusuario)

    .pipe(takeUntil(this.destroy$))

    .subscribe({

      next:(notification) => {

        // Procesa la notificación en tiempo real

        this.notifications = notification;

        this.notifications.sort((a:any, b:any) => {

          const dateA = new Date(a.created_at);

          const dateB = new Date(b.created_at);

          return dateB.getTime() - dateA.getTime();

        });

        this.notificationsBadge = this.notifications.filter((notificacion: any) => {
          
          return notificacion.status == true;
        })

        this.notificationsservice.notificarNuevasNotificaciones(this.notificationsBadge);

      },

      error:(error) => {

        // console.error("Ha ocurrido un error al obtener las notificaciones:", error);
        // this.notificationFlag = 2;
      }}

    );
    
  }



  /**
   * Redirige a la página de todas las notificaciones.
   */
  mostrarTodasNotificaciones() {

    this.stopEventPropagation = false;

    this.route.navigate(['/tecnico-ticket/notificaciones']);

  }



  /**
   * Actualiza el estado de una notificación y redirige según el tipo de notificación.
   * @param notification - Notificación a actualizar
   */
  notificationUpdate(notification: any) {

    if (notification.status == true) {

      const notificacionUpdate = {

        "status": false,

      }

      this.notificationsservice.updateNotificacion(notification.idnotificacion, notificacionUpdate).subscribe(res => {
      
        this.getNotificaciones();

      },

        error => {

          console.error("Error al actualizar notificación:", error);

        }
      )
    }
  }



  /**
   * Detiene la propagación de un evento.
   * @param event - Evento a detener la propagación
   */
  stopPropagation(event: Event) {

    if (this.stopEventPropagation) {

      event.stopPropagation();

    }
  }




  /**
   * Formatea una marca de tiempo en una cadena de fecha y hora legible.
   * @param timestamp - Marca de tiempo a formatear
   * @returns Cadena formateada de fecha y hora
   */
  formatTimestamp(timestamp: number): string {

    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');

  }




  /**
   * Cierra la sesión del usuario y redirige al inicio.
   */
  logout(){
    
    this.authservice.logout();

    this.route.navigate(['']);

    localStorage.clear();

    localStorage.removeItem('auth_token');

    localStorage.removeItem('user');

    this.notificationsservice.limpiarVariable();

  }

}
