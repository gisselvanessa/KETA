import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  constructor() { }

  enviarId: EventEmitter<number>= new EventEmitter<number>();
}
