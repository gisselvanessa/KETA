import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sucursales } from '../models/Sucursales';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-register-sucursal',
  templateUrl: './register-sucursal.component.html',
  styleUrls: ['./register-sucursal.component.css']
})
export class RegisterSucursalComponent implements OnInit {
@Output() enviarIdSucursal= new EventEmitter<number>();

  sucursales :any=[];
  sucursalseleccionada: Sucursales = {} ;

  constructor(
    private userservice: UserService, 
    private route:Router, 
    private comunicationservice: ComunicationService, private changedetectorservice : ChangeDetectorRef) { }



  /**
  * Se ejecuta cuando se inicializa el componente.
  * Obtiene la lista de sucursales disponibles.
  */
  ngOnInit(): void {

  this.obtenerSucursal();
  
  }



  /**
   * Obtiene la lista de sucursales.
   */
  async obtenerSucursal(){

    const sucursal = new Promise((resolve,reject)=>{

      this.userservice.getSucursales().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.sucursales = await sucursal.then(res=>res);
  }



 /**
   * Esta función se llama cuando se ha seleccionado una sucursal.
   * Emite el ID de la sucursal seleccionada para que otros componentes lo utilicen.
   * Luego, navega a la página de registro de usuarios.
   */
  async sucursalobtenida(){
    
    const {codigosucursal} = this.sucursalseleccionada;

    if(codigosucursal){

      this.enviarIdSucursal.emit(Number(codigosucursal));
      
      this.route.navigate(['/home-ticket/register/register-user'])

    }
    this.changedetectorservice.detectChanges();
  }  

}
