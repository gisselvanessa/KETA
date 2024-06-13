import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from '../components/moduleusers/services/auth.service';
import { UserService } from '../components/moduleusers/services/user.service';
import { LinksService } from '../services/links.service';

@Injectable({
  providedIn: 'root'
})
export class TecnicoGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private userservice: UserService,
    private ruta : Router  ,
    private linkservice : LinksService
  
  ){}
  /**
   * Este guard se utiliza para proteger rutas que solo deben ser accesibles 
   * por usuarios con un rol específico, en este caso, un rol de técnico (idrol == 3). 
   * Cuando un usuario intenta acceder a una ruta protegida por TecnicoGuard, 
   * el guard verifica el rol del usuario y decide si se permite o deniega el 
   * acceso a la ruta. En este caso, si el usuario tiene un rol de técnico, 
   * se permite el acceso; de lo contrario, se deniega el acceso.
   * @param route 
   * @param state 
   * @returns 
   */
  
 async canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      // Obtiene información del usuario que ha iniciado sesión

      const usuarioLogin : any = await firstValueFrom(

        this.userservice.get_usuario(String(this.authservice.obtenerUsuarioLoggeado()))
      
        );

      const {idrol} =usuarioLogin;

      // Obtiene el rol del usuario a partir del servicio de enlaces

      const rolobtenido = await firstValueFrom(

        this.linkservice.getUrl(idrol)

      )

      // Comprueba si el usuario tiene un rol de técnico (idrol == 3)

      if(rolobtenido.idrol==3)      {
        
        return true;  // Permite el acceso

      }else{

        return false;  // Deniega el acceso

      }
    
  }
  
}
