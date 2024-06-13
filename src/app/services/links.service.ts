import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }
 /**
   * Obtiene el contenido de una URL utilizando una solicitud HTTP GET.
   *
   * @param url - La URL que se desea obtener.
   * @returns Una observable que emite la respuesta HTTP de la solicitud GET.
   */
  getUrl(url : any):Observable<any>{

    return this.http.get(url).pipe(map
      (res=>res))
  }

}
