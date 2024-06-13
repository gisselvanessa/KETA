import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TipoIdentificacion } from './../models/TipoIdentificacion';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient) {

   }

   getTipoIdentificacion():Observable<any>{  
    return this.http.get(environment.apiUrl+'users/api/tiposidentificaciones/').pipe(
      map(res => res)
    );

   }

   getRoles():Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/roles/').pipe(
      map(res => res)
    );

   }
   getSucursales():Observable<any>{
    return this.http.get(environment.apiUrl+'/users/api/sucursales/').pipe(
      map(res => res)
    );

   }
   getDepartamentos():Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/departamentos/').pipe(
      map(res => res)
    );

   }
   getCargos():Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/cargos/').pipe(
      map(res => res)
    );
   }
   getEstados():Observable<any>{
    return this.http.get(environment.apiUrl+'tasks/api/estados/').pipe(
      map(res => res)
    );
   }
   getEstadosId(id:any):Observable<any>{
    return this.http.get(`${environment.apiUrl}tasks/api/estados/${id}/`).pipe(
      map(res => res)
    );
   }
   getGeneros():Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/generos/').pipe(
      map(res => res)
    );
   }
   getGeneroId(id:any):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/generos/'+id+'/').pipe(
      map(res => res)
    );
   }
   get_usuario(email: string):Observable<any> {
    const url = `${environment.apiUrl}users/user_profile/${email}/`;
    return this.http.get(url).pipe(
      map((resp:any)=> resp)
    );
  }
  get_all_usuarios():Observable<any> {
    return this.http.get(`${environment.apiUrl}users/api/usuarios/`).pipe(
      map((resp:any)=> resp)
    );
  }
  get_all_vusers():Observable<any>{
    return this.http.get(`${environment.apiUrl}users/usuarios_asignacion/`).pipe(
      map((resp:any)=> resp)
    );
  }
  get_all_users():Observable<any>{
    return this.http.get(`${environment.apiUrl}users/usuarios_reporte/`).pipe(
      map((resp:any)=> resp)
    );
  }
  get_all_users_active():Observable<any>{
    return this.http.get(`${environment.apiUrl}users/activeUsers/`).pipe(
      map((resp:any)=> resp)
    );
  }


  getTipoPersona():Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/tipospersonas/').pipe(
      map(res => res)
    );
   }

  create_user(user: any): Observable<any> {

    const url = environment.apiUrl + 'users/api/usuarios/';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, user, { headers});
    
  }
  getCargoId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/cargos/'+id+'/').pipe(
      map(res => res)
    );
   }
   getDepartamentoId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/departamentos/'+id+'/').pipe(
      map(res => res)
    );
   }
   getDepartamentoBySucursalId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/sucursaldepartamentos/?idsucursal='+id).pipe(
      map(res => res)
    );
   }
   getSucursalId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/sucursales/'+id+'/').pipe(
      map(res => res)
    );
   }

   getPersonaId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/tipospersonas/'+id+'/').pipe(
      map(res => res)
    );
   }
   getRolId(id:number):Observable<any>{
    return this.http.get(environment.apiUrl+'users/api/roles/'+id+'/').pipe(
      map(res => res)
    );
   }
   getTipoIdentificacionId(id:number):Observable<any>{  
    return this.http.get(environment.apiUrl+'users/api/tiposidentificaciones/'+id+'/').pipe(
      map(res => res)
    );

   }
   getUserById(id: string) {
    return this.http.get(`${environment.apiUrl}users/idUsers/${id}/`)
    .pipe(map(response => {
      return response;
    }));
  }
  updateUser(bodyRequest: any) {
    return this.http.put(`${environment.apiUrl}users/api/usuarios/${bodyRequest.idusuario}/`, bodyRequest)
    .pipe(map(response => {
      return response;
    }));
  }
  updatePerson(bodyRequest: any) {
    return this.http.patch(`${environment.apiUrl}users/api/personas/${bodyRequest.idpersona}/`, bodyRequest)
    .pipe(map(response => {
      return response;
    }));
  }
  
}
