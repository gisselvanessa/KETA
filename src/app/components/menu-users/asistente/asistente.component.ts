import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../moduleusers/services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../moduleusers/services/user.service';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css']
})
export class AsistenteComponent implements OnInit {

  // Se crea menuItems que contenga las rutas en el sidebar

  menuItems: any[] = [

    {

      label: 'Dashboard',
      icon: 'pi pi-th-large',
      routerLink: ['/asistente-ticket/dashboard-asistente/ticket-table-asistente']
    
    },

    {

      label: 'Tickets',
      icon: 'pi pi-ticket',
      items: [

        { label: 'Todos los tickets', icon: 'pi pi-list', routerLink: ['/asistente-ticket/list-tickets'] },
        { label: 'Crear nuevo ticket', icon: 'pi pi-plus', routerLink: ['/asistente-ticket/ticket-form'] },
      
      ]
    
    },
    {

      label: 'Mi Perfil',
      icon: 'fa-regular fa-id-badge',
      routerLink: ['/asistente-ticket/profile']

    },
  ];

  usuarioLoggeado: string = "";

  constructor(

    // Inyecta los servicios necesarios

    private authservice:AuthService, 

    private route: Router, 

    private userService: UserService

    ) { }


  async ngOnInit() {

    const userLog = await firstValueFrom(this.userService.get_usuario(String(localStorage.getItem('user'))))

    this.usuarioLoggeado = userLog.first_name +' '+ userLog.last_name;

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

  }

}
