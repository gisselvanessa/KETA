import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'users/login/', { email: email, password: password })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('auth_token', resp.token);
        }),
        catchError((error) => {
           //this.showLoginError(); // Call the method to show the error pop-up
          return throwError(error);
        })
      );
  }
  logout() {
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  obtenerUsuarioLoggeado(){
    return localStorage.getItem('user');

  }

  refreshToken(token:any):Observable<any>{
    return this.http.post(environment.apiUrl + 'users/login/refresh',token).pipe(
      tap((resp: any) => {
        localStorage.setItem('auth_token', resp.access);
      }),
      catchError((error) => {
         //this.showLoginError(); // Call the method to show the error pop-up
        return throwError(error);
      })
    );
  }


  desactivarUsuario(id: string) {
      return this.http.delete(`${environment.apiUrl}users/api/usuarios/${id}/`)
      .pipe(map(response => {
        return response;
      }));
    }
  }

