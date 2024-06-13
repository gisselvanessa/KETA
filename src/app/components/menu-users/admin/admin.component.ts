import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../moduleusers/services/auth.service';
import { Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subject, firstValueFrom } from 'rxjs';
import { UserService } from '../../moduleusers/services/user.service';
import { NotificationsService } from './../../../services/notifications.service';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  menuItems: any[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-th-large',
      routerLink: ['/home-ticket/dashboard-supervisor/ticket-table-supervisor']
      
    },
    {
      label: 'Tickets',
      icon: 'pi pi-ticket',
      items: [
        { label: 'Todos los tickets', icon: 'pi pi-list', routerLink: ['/home-ticket/list-tickets'] },
        { label: 'Seguimiento', icon: 'pi pi-book', routerLink: ['/home-ticket/ticket-tracking'] },
        { label: 'Mis tareas', icon: 'pi pi-tablet', routerLink: ['/home-ticket/dashboard-tasks/my-tasks'] }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      items: [
        { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['/home-ticket/register/register-sucursal'] },
        { label: 'Lista de usuarios', icon: 'pi pi-list', routerLink: ['/home-ticket/list-users'] }
      ]
    },
    {
      label: 'Reportes',
      icon: 'pi pi-file',
      routerLink: ['/home-ticket/reportes/']
    },
    // {

    //   label: 'Mi Perfil',
    //   icon: 'fa-regular fa-id-badge',
    //   routerLink: ['/home-ticket/profile']

    // },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      routerLink: ['/home-ticket/configuraciones/']
    }
  ];


  isSidebarCollapsed = false;
  @ViewChild('ticketPanel')
  ticketPanel!: MatExpansionPanel;
  @ViewChild('usersPanel')
  usersPanel!: MatExpansionPanel;
  usuarioLoggeado: string = "";
  showNotification: boolean = false;
  notifications: any = [];
  notificationsBadge: any = [];
  usuario: any = {}
  // stopEventPropagation: boolean = false;
  notificacioneshabilitadas: number = 0;
  private destroy$ = new Subject<void>();


  constructor(

    private authservice: AuthService, 

    private route: Router, 

    private userService: UserService, 

    private el: ElementRef,

    private notificationsservice: NotificationsService, 

    private router: Router, 

    private messageservice :MessageService) { }



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
   * Redirige a la página de todas las notificaciones.
   */

  mostrarTodasNotificaciones() {

    this.route.navigate(['/home-ticket/notificaciones']);

  }



  /**
   * Actualiza el estado de una notificación y redirige según el tipo de notificación.
   *
   * @param notification - La notificación a actualizar y procesar.
   */
  notificationUpdate(notification: any) {
    
    if (notification.status == true) {

      const notificacionUpdate = {

        "status": false,

      }

      this.notificationsservice.updateNotificacion(notification.idnotificacion, notificacionUpdate).subscribe(res => {

        this.getNotificaciones();

        if(notification.notification_type=='Resolution Notification'){

          this.route.navigate(['/home-ticket/dashboard-supervisor/ticket-table-supervisor'])
        
        }

        else if(notification.notification_type=='Assignation Notification'){

          this.route.navigate(['/home-ticket/dashboard-tasks/my-tasks'])

        }
      },
        error => {

          console.log(error);

        }
      )
    }

    else {

      if(notification.notification_type=='Resolution Notification'){

        this.route.navigate(['/home-ticket/dashboard-supervisor/ticket-table-supervisor'])
      
      }

      else if(notification.notification_type=='Assignation Notification'){

        this.route.navigate(['/home-ticket/dashboard-tasks/my-tasks'])

      }
    }

  }

/**
 * Transforma una fecha en formato timestamp en un formato establecido
 * @param timestamp fecha en formato timestamp
 * @returns una fecha en un nuevo formato
 */
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');
  }



  /**
   * Cierra el modal de notificaciones
   */
  closeNotification() {
    this.showNotification = false;
  }



  /**
   * Obtiene las notificaciones y las notificaciones habilitadas para el usuario loggeado.
   */
  async getNotificaciones() {

    this.notificationsservice.obtenerNotificacionesXId(this.usuario.idusuario)

    .pipe(takeUntil(this.destroy$)).subscribe({

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
        
      }}
    );
  }



  /**
   * Muestra u oculta el contenedor de notificaciones.
   */
  toggleNotificationContainer() {

    this.showNotification = !this.showNotification;

  }




  /**
   * Cierra la sesión del usuario y redirige al inicio.
   */
  logout() {

    this.authservice.logout();

    this.route.navigate(['']);

    localStorage.clear();

    localStorage.removeItem('auth_token');

    localStorage.removeItem('user');

    this.notificationsservice.limpiarVariable();
  }

}
