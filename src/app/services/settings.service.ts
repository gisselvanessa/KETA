import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient

  ) { }

  getAllData() {
    return this.http.get(`${environment.apiUrl}users/api/diasfestivos/`)
    .pipe(map(response => {
      return response;
    }));
  }

  getData() {
    return this.http.get(`${environment.apiUrl}users/activeDiasFestivos/`)
    .pipe(map(response => {
      return response;
    }));
  }

  create(bodyRequest: any) {
    return this.http.post(`${environment.apiUrl}users/api/diasfestivos/`, bodyRequest)
    .pipe(map(response => {
      return response;
    }));
  }

  update(bodyRequest: any) {
    return this.http.put(`${environment.apiUrl}users/api/diasfestivos/${bodyRequest.iddiasfestivos}/`, bodyRequest)
    .pipe(map(response => {
      return response;
    }));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}users/api/diasfestivos/${id}/`)
    .pipe(map(response => {
      return response;
    }));
  }
}
