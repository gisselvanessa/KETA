
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../moduleusers/services/auth.service';
import { Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../moduleusers/services/user.service';
import { NotificationsService } from './../../../services/notifications.service';
import { format } from 'date-fns';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  showNotification: boolean = false;
  notifications: any = [];
  notificationsBadge: any = [];
  notificationFlag: number = 0;
  notificationspinner: boolean = false;
  usuario: any = {}
  usersPanel!: MatExpansionPanel;
  usuarioLoggeado: string = "";
  dash: MenuItem = {};
  items: MenuItem[] = [];

  constructor(private authservice: AuthService, private route: Router, private userService: UserService, private el: ElementRef,
    private notificationsservice: NotificationsService, private router: Router) { }

  async ngOnInit() {
    this.notificationspinner = true;

    this.items = [

      { label: 'Todas las notificaciones' },

    ];
    this.dash = { icon: 'pi pi-th-large', routerLink: '/home-ticket/dashboard/ticket-table' };

    this.usuario = await firstValueFrom(this.userService.get_usuario(String(localStorage.getItem('user'))))

    this.usuarioLoggeado = this.usuario.first_name + ' ' + this.usuario.last_name;

    await this.getNotificaciones();

  }

  async getNotificaciones() {
    try {

      this.notificationsservice.obtenerNotificacionesXId(this.usuario.idusuario).subscribe(
        (notification) => {
          // Procesa la notificación en tiempo real
          this.notifications = notification;
          this.notifications.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB.getTime() - dateA.getTime();
          });
          this.notificationspinner = false;

        },
        (error) => {
          console.error("Ha ocurrido un error al obtener las notificaciones:", error);
          this.notificationFlag = 2;
          this.notificationspinner = false;

        }
      );

    } catch (error) {
      console.error("Ha ocurrido un error al obtener las notificaciones:", error);
      this.notificationFlag = 2;
      this.notificationspinner = false;

    }
  }


  notificationUpdate(notification: any) {
    if (notification.status == true) {
      const notificacionUpdate = {
        "status": false,
      }
      this.notificationsservice.updateNotificacion(notification.idnotificacion, notificacionUpdate).subscribe(res => {
        this.getNotificaciones();
      },
        error => {
        }
      )
    }

  }
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');
  }
}
