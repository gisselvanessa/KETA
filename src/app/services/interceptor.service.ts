// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
// import { UserService } from '../components/moduleusers/services/user.service';
// import { AuthService } from '../components/moduleusers/services/auth.service';
// import { MessageService } from 'primeng/api';

// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService implements HttpInterceptor {

//   constructor( private ruta : Router, private authservice: AuthService, private messageservice : MessageService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('auth_token');
    
//     if (token) {

//       req = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(req).pipe(
//       catchError((err: HttpErrorResponse) => {

        
//         if (err.status === 401) {

//           if(localStorage.getItem('auth_token')){
            
//             this.authservice.refreshToken
//             ({refresh: localStorage.getItem('refresh_token')})
//             .subscribe({
//               next: (data:any)=>{
//                 //console.log(data);
//                 this.ruta.navigateByUrl(this.ruta.url);
//                 this.messageservice.add({ severity: 'info', summary: 'Sesión caducada', detail: 'La sesión acaba de actualizarse por su seguridad. Cualquier proceso que no haya sido completado debe volver a hacerlo',life:4000 });

//               }
//             })
//           }
//           else{

//             this.ruta.navigate(['']);
//             localStorage.removeItem('auth_token');
//             localStorage.clear();
//           }
                
//         }

//         return throwError(err);

//       })
//     );
    
//   }
// }



//new1



import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../components/moduleusers/services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Obtiene el token de autenticación del almacenamiento local y agrega ese token 
    // como encabezado de autorización a las solicitudes HTTP salientes.

    const token = localStorage.getItem('auth_token');

    if (token) {

      // Agrega el token de autenticación a la cabecera de la solicitud

      req = req.clone({

        setHeaders: {

          Authorization: `Bearer ${token}`

        }

      });

    }

    return next.handle(req).pipe(


    //Captura y maneja errores HTTP, en particular, el código de estado 401 (No autorizado), 
    //que indica que la sesión del usuario ha caducado.

      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {

          // Si se encuentra un error 401, intenta renovar el token de autenticación utilizando 
          //un token de actualización (refresh token) almacenado localmente.

          const refreshToken = localStorage.getItem('refresh_token');

          if (refreshToken) {

            // Intenta renovar el token utilizando el servicio de autenticación

            return this.authService.refreshToken({ refresh: refreshToken }).pipe(

              switchMap((data: any) => {

                // Si la renovación del token tiene éxito, muestra un mensaje informativo al usuario 
                // y continúa la solicitud original con el nuevo token.

                this.messageService.add({

                  severity: 'info',
                  summary: 'Sesión caducada',
                  detail: 'La sesión acaba de actualizarse por su seguridad. Cualquier proceso que no haya sido completado debe volver a hacerlo',
                  life: 4000

                });

                // Continúa la solicitud original con el nuevo token

                const newToken = localStorage.getItem('auth_token');

                if (newToken) {

                  req = req.clone({

                    setHeaders: {

                      Authorization: `Bearer ${newToken}`
                      
                    }
                  });

                }

                return next.handle(req);
              }),
              catchError(() => {

                // Si la renovación de token falla, redirige al usuario a la página de inicio de sesión y limpia el almacenamiento local.

                this.router.navigate(['']);

                localStorage.removeItem('auth_token');

                localStorage.clear();

                return throwError(err);
              })
            );

          } else {

            // Si no hay un token de actualización disponible, redirige al usuario a la página de inicio de sesión y limpia el almacenamiento local.

            this.router.navigate(['']);

            localStorage.removeItem('auth_token');

            localStorage.clear();
          }
        }

        return throwError(err);
      })
    );
  }
}


