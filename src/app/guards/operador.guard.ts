import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from '../components/moduleusers/services/auth.service';
import { UserService } from '../components/moduleusers/services/user.service';
import { LinksService } from '../services/links.service';

@Injectable({
  providedIn: 'root'
})
export class OperadorGuard implements CanActivate {

  constructor(
    private authservice: AuthService,
      private userservice: UserService,
      private ruta : Router  ,
      private linkservice : LinksService
  ){}

async  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const usuarioLogin : any = await firstValueFrom(

        this.userservice.get_usuario(String(this.authservice.obtenerUsuarioLoggeado()))
      );

      const {idrol} =usuarioLogin;

      const rolobtenido = await firstValueFrom(
        this.linkservice.getUrl(idrol)
      )
      if(rolobtenido.idrol==4)      {
        
        return true;
      }else{
        return false;
      }
    return true;
  }
  
}
