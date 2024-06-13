import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../services/user.service';
import { SnackbarService } from './../services/snackbar.service';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Se declaran las propiedades email, password y spinnerLoad que se utilizan en el proceso de inicio de sesión.
  email = '';
  password = '';
  spinnerLoad: boolean = false;
  showPassword: boolean = false;
  loginAttempts: number = 0;
  id:any
  // El constructor inyecta servicios relacionados con la autenticación, manejo de notificaciones (snackbar), enrutamiento, y servicios para obtener información de usuario y roles.
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
    private userService: UserService,
    private linkservice: LinksService
  ) {}

  ngOnInit() {}

  /**
   * En este método Login, se realiza el proceso de inicio de sesión.
   * Se intenta autenticar al usuario, se almacena el token de autenticación en el almacenamiento local y se obtiene información sobre el usuario y su rol.
   * Luego, el usuario se redirige a la página correspondiente según su rol. Si la autenticación falla, se muestra una notificación de error.
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  async Login() {
    try {
      this.spinnerLoad = true;
      // Intenta iniciar sesión utilizando el servicio de autenticación
      const resp = await firstValueFrom(
        this.authService.login(this.email, this.password)
      );
      // Obtiene el token de autenticación y lo almacena en el almacenamiento local
      const token = resp.token ? resp.access : resp.access;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('refresh_token', resp.refresh);

      // Obtiene información del usuario
      const user = await firstValueFrom(
        this.userService.get_usuario(this.email)
      );
      
      // Obtiene el rol del usuario
      const { idrol } = user;
      const rolobtenido = await firstValueFrom(this.linkservice.getUrl(idrol));
      this.spinnerLoad = false;
      if (rolobtenido.idrol == 1) {
        const navigationExtras: NavigationExtras = {
          state: { usuario: user },
        };
        this.router.navigate(
          ['home-ticket/dashboard-supervisor/ticket-table-supervisor/'],
          navigationExtras
        );
        localStorage.setItem('user', this.email);
      }
      if (rolobtenido.idrol == 2) {
        const navigationExtras: NavigationExtras = {
          state: { usuario: user },
        };
        this.router.navigate(
          ['asistente-ticket/dashboard-asistente/ticket-table-asistente/'],
          navigationExtras
        );
        localStorage.setItem('user', this.email);
      }
      if (rolobtenido.idrol == 3) {
        const navigationExtras: NavigationExtras = {
          state: { usuario: user },
        };
        this.router.navigate(
          ['tecnico-ticket/dashboard/ticket-table/'],
          navigationExtras
        );
        localStorage.setItem('user', this.email);
      }
    } catch (err) {
      this.loginAttempts++;
  
      if (this.loginAttempts >= 5) {
        try {
          // Intenta obtener información del usuario usando el correo electrónico
          const user = await firstValueFrom(this.userService.get_usuario(this.email));
          
          // Si el usuario existe en la base de datos, desactiva al usuario
          if (user) {
            await firstValueFrom(this.authService.desactivarUsuario(user.idusuario));
            this.snackbarService.show('Tu cuenta ha sido desactivada debido a múltiples intentos fallidos de inicio de sesión. Contáctate con el administrador.');
          } else {
            // Si el usuario no existe en la base de datos, muestra un mensaje de error
            this.snackbarService.show('No se encontró ningún usuario con este correo electrónico.');            
          }
        } catch (error) {
          console.error('Error al verificar el correo electrónico en la base de datos:', error);
          this.snackbarService.show('No se encontró ningún usuario con este correo electrónico.');
        }
      } else {
        this.snackbarService.show('Credenciales incorrectas. Intente nuevamente');
      }
      this.spinnerLoad = false;
    }
  }
}
