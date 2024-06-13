import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Sucursales } from '../models/Sucursales';
import { UserService } from '../services/user.service';
import { TipoIdentificacion } from '../models/TipoIdentificacion';
import { Generos } from '../models/Generos';
import { Departamentos } from '../models/Departamentos';
import { Cargos } from '../models/Cargos';
import { Roles } from '../models/Roles';
import { TipoPersonas } from '../models/TipoPersonas';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register-steps',
  templateUrl: './register-steps.component.html',
  styleUrls: ['./register-steps.component.css']
})
export class RegisterStepsComponent implements OnInit {
  items: MenuItem[] = [];
  dash: MenuItem = {};
  @Output() enviarIdSucursal = new EventEmitter<number>();
  user: any = {}; 
  keyFikterLetras: RegExp = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
  keyFilterEmail:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  regexnumber:RegExp = /^[0-9]+$/;
  regexNumerosLetrasSinEspacios = /^[A-Za-z0-9]+$/;
  spinnerLoad: boolean = false;
  stepseleccionada: number = 0;
  tiposidentificacion: any = [];
  departamentos: any = [];
  departamentosregistro: any = [];
  cargos: any = [];
  generos: any = [];
  roles: any = [];
  tipospersonas: any = [];
  data: any[] = [];
  identificacionseleccionada: TipoIdentificacion = {};
  generoseleccionado: Generos = {};
  departamentoseleccionado: Departamentos = {};
  cargoseleccionado: Cargos = {};
  rolseleccionado: Roles = {};
  tipopersonaseleccionada: TipoPersonas = {};
  registroActivado: boolean = false;
  personaseleccionada: TipoPersonas = {};
  numeroidentificacion: string = '';
  name: string = '';
  apellidos: string = '';
  direccion: string = '';
  celular: string = '';
  telefono: string = '';
  extension: string = '';
  email: string = '';
  password: string = '';
  events: any = [];
  items1: MenuItem[] = [];
  items2: MenuItem[] = [];
  activeIndex: number = 0;
  sucursales: any = [];
  sucursalseleccionada: Sucursales = {};
  maxDniLength: number = 1;



  constructor(

    private userservice: UserService,

    private route: Router,

    private messageService: MessageService
    ) { }

  
  async ngOnInit() {

    this.items = [

      { label: 'Usuario' },
      { label: 'Nuevo usuario' },

    ];

    this.dash = { icon: 'pi pi-th-large', routerLink: '/home-ticket/register/register-sucursal' };

    this.items1 = [
      
      { label: 'Sucursal' },
      { label: 'Datos' },
      { label: 'Confirmación' }
      
    ];
    this.obtenerSucursal();

    this.obtenerTipoIdentificacion();

    this.obtenerGenero();

    this.obtenerRol();

    this.obtenerCargo();

    this.obtenerDepartamento();

    this.obtenerTipoPersona();


   
    this.data = [

      {

        rolseleccionado : { nombrerol: this.rolseleccionado?.nombrerol },
        departamentoseleccionado : { nombrerol: this.departamentoseleccionado?.nombredepartamento },
        cargoseleccionado : { nombrerol: this.cargoseleccionado?.descripcioncargo },
        sucursalseleccionada: { nombresucursal: this.sucursalseleccionada?.nombresucursal },
        personaseleccionada: { descripciontipopersona: this.personaseleccionada?.descripciontipopersona },
        identificacionseleccionada: { descripciontipoidentificacion: this.identificacionseleccionada?.descripciontipoidentificacion },
        numeroidentificacion: this.numeroidentificacion,
        name: this.name,
        apellidos: this.apellidos,
        generoseleccionado: { descripciongenero: this.generoseleccionado?.descripciongenero },
        email: this.email,
        celular: this.celular,
        telefono: this.telefono,
        direccion: this.direccion

      }
      
    ];


    this.activeIndex = 0;
  }

  /**
  * Maneja el evento de selección de paso.
  * @param event - Evento de selección de paso
  */
  handleStepSelected(event: any) {

    this.stepseleccionada = event;

  }




  /**
   * Obtiene la lista de sucursales.
   */
  async obtenerSucursal() {

    const sucursal = new Promise((resolve, reject) => {

      this.userservice.getSucursales().subscribe(

        res => {

          resolve(res);

        }
      )
    });

    this.sucursales = await sucursal.then(res => res);
  }




  /**
   * Función llamada cuando se selecciona una sucursal.
   */
  async sucursalobtenida() {

    const { url } = this.sucursalseleccionada;
    
    if (url) {

      
      this.departamentos = this.departamentosregistro.filter((departamento: any) => {
        
        return departamento.idsucursal == url
        
      })
      this.activeIndex = 1;

    }
  }




  /**
   * Obtiene la lista de tipos de identificación.
   */
  async obtenerTipoIdentificacion() {

    const tipoidentifacionPromise = new Promise((resolve, reject) => {

      this.userservice.getTipoIdentificacion().subscribe(

        res => {

          resolve(res);

        }
      )
    });

    this.tiposidentificacion = await tipoidentifacionPromise.then(res => res);

  }



  /**
   * Obtiene la lista de géneros.
   */
  async obtenerGenero() {

    const genero = new Promise((resolve, reject) => {

      this.userservice.getGeneros().subscribe(

        res => {

          resolve(res);

        }
      )
    });

    this.generos = await genero.then(res => res);
  }



 /**
   * Obtiene la lista de roles.
   */
  async obtenerRol() {

    const rol = new Promise((resolve, reject) => {

      this.userservice.getRoles().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.roles = await rol.then(res => res);
  }




  /**
   * Obtiene la lista de cargos.
   */
  async obtenerCargo() {

    const cargo = new Promise((resolve, reject) => {

      this.userservice.getCargos().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.cargos = await cargo.then(res => res);
  }




  /**
   * Obtiene la lista de tipos de personas.
   */
  async obtenerTipoPersona() {

    const persona = new Promise((resolve, reject) => {

      this.userservice.getTipoPersona().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.tipospersonas = await persona.then(res => res);
  }





  /**
 * Esta función obtiene la lista de departamentos.
 */
  async obtenerDepartamento() {

    const departamento = new Promise((resolve, reject) => {

      this.userservice.getDepartamentos().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.departamentosregistro = await departamento.then(res => res);

  }



  /**
 * Esta función se llama cuando el usuario pasa al paso de confirmación.
 * Verifica que todos los campos necesarios estén completados antes de avanzar al paso de confirmación.
 * Si los campos están completados, cambia al paso de confirmación, de lo contrario, muestra una advertencia.
 */
  siguienteConfirmacion() {

    if (this.generoseleccionado.idgenero != null &&

      this.identificacionseleccionada.idtipoidentificacion != null &&

      this.personaseleccionada.idtipopersona != null &&

      this.numeroidentificacion != null &&

      this.name != null &&

      this.apellidos != null &&

      this.email != null &&

      this.direccion != null &&

      this.rolseleccionado.idrol != null &&

      this.departamentoseleccionado.iddepartamento != null &&

      this.cargoseleccionado.idcargo != null &&

      this.password != null


    ) {

      this.activeIndex = 2;

    }

    else {

      this.messageService.add({ severity: 'warn', summary: 'Hay campos vacíos', detail: 'No se puede realizar el registro' });

    }
  }



  /**
 * Esta función se llama cuando el usuario decide cancelar el proceso de registro.
 * Regresa al paso de selección de sucursal y limpia todos los campos del formulario.
 */
  cancelar(){

    this.activeIndex = 1;

    this.limpiarCampos();

  }




  /**
 * Esta función se llama cuando el usuario confirma el registro de un nuevo usuario.
 * Prepara los datos del usuario y envía una solicitud HTTP para crear el usuario.
 * Muestra un mensaje de éxito o error según el resultado de la operación.
 */
  guardarRegistro() {
    this.spinnerLoad = true;

    const usuarioRegistro = {
      "persona": {

        "idgenero": this.generoseleccionado.url,
        "idtipoidentificacion": this.identificacionseleccionada.url,
        "idtipopersona": this.personaseleccionada.url,
        "identificacion": this.numeroidentificacion,
        "nombre": this.name,
        "apellido": this.apellidos,
        "emailclientecliente": this.email,
        "celular": this.celular,
        "telefono": this.telefono,
        "extension": this.extension,
        "direccion": this.direccion

      },
      "usuario": {

        "idrol": this.rolseleccionado.url,
        "iddepartamento": this.departamentoseleccionado.url,
        "idcargo": this.cargoseleccionado.url,
        "password": this.password,
        "email": this.email,
        "username": this.name
      }
    }

    this.userservice.create_user(usuarioRegistro).subscribe(res => {

      this.messageService.add({ 

        severity: 'success', 

        summary: 'Usuario registrado', 

        detail: 'El usuario se creo correctamente' 

      });

      this.spinnerLoad = false;
      
      setTimeout(()=>{

        this.route.navigate(['/home-ticket/list-users']);

      },3000)
      

    },  
      err => {

        this.messageService.add({ severity: 'error', summary: 'Usuario no registrado', detail: 'El usuario ya existe o están mal los datos ingresados' });

        this.spinnerLoad = false;

      });
  }


  


/**
 * Esta función valida que la longitud del número de celular sea de 10 dígitos.
 * Si la longitud es incorrecta, se establece un error en el campo.
 * @param numInput - El campo de número de celular
 */
  validarNumeroCelular(numInput: NgModel): void {

    if (numInput.value && numInput.value.length !== 10) {

      numInput.control.setErrors({ 'longitudIncorrecta': true });

    } 
    else {

      numInput.control.setErrors(null);

    }
  }





  /**
 * Esta función valida que la longitud del número de teléfono sea de 9 dígitos.
 * Si la longitud es incorrecta, se establece un error en el campo.
 * @param numInput - El campo de número de teléfono
 */
  validarNumeroTelefono(numInput: NgModel): void {

    if (numInput.value && numInput.value.length !== 9) {

      numInput.control.setErrors({ 'longitudIncorrecta': true });

    } 
    else {

      numInput.control.setErrors(null);

    }
  }


/**
 * Esta función regresa al paso de selección de sucursal.
 * Limpia todos los campos y configuraciones de pasos y sucursal seleccionada.
 */
  regresarSucursal() {

    this.activeIndex = 0;

    this.sucursalseleccionada = {};

    this.limpiarCampos();
  }




  /**
 * Esta función regresa al paso de entrada de datos personales.
 */
  regresarDatosPersona() {

    this.activeIndex = 1;

  }




  /**
 * Limpia todos los campos del formulario.
 */
  limpiarCampos() {

    this.apellidos = '';

    this.generoseleccionado = {};

    this.identificacionseleccionada = {};

    this.personaseleccionada = {};

    this.numeroidentificacion = '';

    this.name = '';

    this.email = '';

    this.celular = '';

    this.telefono = '';

    this.extension = '';

    this.direccion = '';

    this.rolseleccionado = {};

    this.departamentoseleccionado = {};

    this.cargoseleccionado = {};

    this.password = '';

    this.email = '';

  }




  /**
 * Valida la longitud del número de identificación según el tipo de identificación seleccionado.
 * @param numInput - El campo de número de identificación
 */
  validarNumeroidentificacion(numInput: NgModel): void {
    //Cedula
    if (this.identificacionseleccionada.idtipoidentificacion === 1) {
      if (numInput.value && numInput.value.length !== 10) {
        numInput.control.setErrors({ longitudIncorrecta: true });
      } else {
        numInput.control.setErrors(null);
      }
      //Ruc
    } else if (this.identificacionseleccionada.idtipoidentificacion === 2) {
      if (numInput.value && numInput.value.length !== 13) {
        numInput.control.setErrors({ longitudIncorrecta2: true });
      } else {
        numInput.control.setErrors(null);
      }
    } else {
      if (numInput.value && numInput.value.length < 10) {
        numInput.control.setErrors({ longitudIncorrecta3: true });
      } else {
        numInput.control.setErrors(null);
      }
    }
  }


  cambiarMaxlengthDni() {
    switch (this.identificacionseleccionada.codigotipoidentificacion) {
      case 'C':
        this.maxDniLength = 10;
        break;
      case 'R':
        this.maxDniLength = 13;
        break;
      case 'P':
        this.maxDniLength = 50;
        break;
      case 'F':
        this.maxDniLength = 50;
        break;
      case 'X':
        this.maxDniLength = 50;
        break;
      default:
        this.maxDniLength = 1;
    }
  }

  /**
 * Convierte el valor del campo 'name' a mayúsculas.
 * @param event - Evento de entrada de datos
 */
  convertirAMayusculasName(event:any){

    this.name = event.target.value.toUpperCase();

  }




  /**
 * Convierte el valor del campo 'apellidos' a mayúsculas.
 * @param event - Evento de entrada de datos
 */
  convertirAMayusculasApellido(event:any){

    this.apellidos = event.target.value.toUpperCase();

  }


  /**
 * Convierte el valor del campo 'direccion' a mayúsculas.
 * @param event - Evento de entrada de datos
 */
  convertirAMayusculasDireccion(event:any){

    this.direccion = event.target.value.toUpperCase();

  }

}


