import { Component, OnInit } from '@angular/core';
import { TipoIdentificacion } from '../models/TipoIdentificacion';
import { UserService } from '../services/user.service';
import { Generos } from '../models/Generos';
import { Sucursales } from '../models/Sucursales';
import { Departamentos } from '../models/Departamentos';
import { Cargos } from '../models/Cargos';
import { Roles } from '../models/Roles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TipoPersonas } from './../models/TipoPersonas';
import { MessageService } from 'primeng/api';
import {PrimeIcons} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import {  Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  @Input() idRecibido: number = 0;
  
  user: any = {}; 
  stepseleccionada: number=0;
  tiposidentificacion : any = [];
  departamentos :any=[];
  departamentosregistro :any=[];
  cargos :any=[];
  generos: any =[];
  roles: any =[];
  tipospersonas: any = [];
  identificacionseleccionada :  TipoIdentificacion = {};
  generoseleccionado: Generos = {} ;
  departamentoseleccionado:  Departamentos = {};
  cargoseleccionado: Cargos = {} ;
  rolseleccionado: Roles = {};
  tipopersonaseleccionada: TipoPersonas= {} ;
  registroActivado: boolean=false;
  personaseleccionada: TipoPersonas = {} ;
  numeroidentificacion: string='';
  name: string='';
  apellidos: string='';
  direccion: string='';
  celular: string='';
  telefono: string='';
  extension: string='';
  email: string='';
  password: string='';
  events: any =[];
  items: MenuItem[]=[];


  constructor(

    private userservice : UserService,

     private router: Router,

     private formBuilder: FormBuilder,

     private http: HttpClient,

     private messageService: MessageService,

     private comunicationservice: ComunicationService

     ) { 
      
     }


  async ngOnInit(){

    await this.obtenerTipoIdentificacion();

    await this.obtenerGenero();

    await this.obtenerRol();

    await this.obtenerCargo();

    await this.obtenerDepartamento();

    await this.obtenerTipoPersona();

    await this.obtenerSucursal();

  }




  /**
   * Maneja el evento de selección de un paso en el proceso de registro.
   */
  handleStepSelected(event: any) {

    this.stepseleccionada = event;
  
  }




/**
   * Obtiene la lista de tipos de identificación mediante una solicitud HTTP.
   */
  async obtenerTipoIdentificacion(){

    const tipoidentifacionPromise = new Promise((resolve,reject)=>{

      this.userservice.getTipoIdentificacion().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.tiposidentificacion = await tipoidentifacionPromise.then(res=>res);
  }
  



/**
   * Obtiene la lista de géneros mediante una solicitud HTTP.
   */
  async obtenerGenero(){

    const genero = new Promise((resolve,reject)=>{

      this.userservice.getGeneros().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.generos = await genero.then(res=>res);
  }




   /**
   * Obtiene la lista de roles mediante una solicitud HTTP.
   */
  async obtenerRol(){

    const rol = new Promise((resolve,reject)=>{

      this.userservice.getRoles().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.roles = await rol.then(res=>res);
  }




  /**
   * Obtiene la lista de cargos mediante una solicitud HTTP.
   */
  async obtenerCargo(){

    const cargo = new Promise((resolve,reject)=>{

      this.userservice.getCargos().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.cargos = await cargo.then(res=>res);
  }




  /**
   * Obtiene la lista de tipos de personas mediante una solicitud HTTP.
   */
  async obtenerTipoPersona(){

    const persona = new Promise((resolve,reject)=>{

      this.userservice.getTipoPersona().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.tipospersonas = await persona.then(res=>res);
  }




  /**
   * Obtiene la lista de departamentos mediante una solicitud HTTP.
   */
  async obtenerDepartamento(){

    const departamento = new Promise((resolve,reject)=>{

      this.userservice.getDepartamentos().subscribe(

        res => {

          resolve(res);

        }
      )
    });
    this.departamentosregistro   = await departamento.then(res=>res);

  }



  /**
   * Guarda el registro del usuario con los datos proporcionados.
   */
    guardarRegistro(){

        const usuarioRegistro={

          "persona": {

            "idgenero": this.generoseleccionado.idgenero,

            "idtipoidentificacion": this.identificacionseleccionada.idtipoidentificacion,

            "idtipopersona": this.personaseleccionada.idtipopersona,

            "identificacion":  this.numeroidentificacion,

            "nombre": this.name,

            "apellido": this.apellidos,

            "emailclientecliente": this.email,

            "celular": this.celular,

            "telefono": this.telefono,

            "direccion": this.direccion
        },

        "usuario": {

            "idrol": this.rolseleccionado.idrol,

            "iddepartamento": this.departamentoseleccionado.iddepartamento,

            "idcargo": this.cargoseleccionado.idcargo,

            "password": this.password,

            "email": this.email,

            "username": this.name

        }
      }

        this.userservice.create_user(usuarioRegistro).subscribe(res=>{

        this.messageService.add({severity:'success', summary:'Usuario registrado', detail:'El usuario se creo correctamente'});

          // Restablecer campos
          this.apellidos = '';

          this.generoseleccionado={};

          this.identificacionseleccionada={};

          this.personaseleccionada={};

          this.numeroidentificacion='';

          this.name='';

          this.email='';

          this.celular='';

          this.telefono='';

          this.direccion='';

          this.rolseleccionado={};

          this.departamentoseleccionado={};

          this.cargoseleccionado={};

          this.password='';

          this.email='';
        // this.router.navigate(['/home-ticket/register/register-confirmation'])

        },
        err=>{

          this.messageService.add({severity:'error', summary:'Usuario no registrado', detail:'El usuario ya existe o están mal los datos ingresados'});

        });
      }




  /**
  * Cancela el registro y restablece los campos.
  */
  cancelar(){

    this.resetFields();
      
  }




    /**
   * Restablece los campos del formulario.
   */
  resetFields() {

    this.apellidos = '';

    this.generoseleccionado = {};

    this.identificacionseleccionada = {};

    this.personaseleccionada = {};

    this.numeroidentificacion = '';

    this.name = '';

    this.email = '';

    this.celular = '';

    this.telefono = '';

    this.direccion = '';

    this.rolseleccionado = {};

    this.departamentoseleccionado = {};

    this.cargoseleccionado = {};

    this.password = '';

    this.email = '';

  }


      /**
   * Obtiene la lista de sucursales mediante una solicitud HTTP.
   */
    async obtenerSucursal(){

        //console.log("inicio depart");


          // this.comunicationservice.enviarId.subscribe((id:any)=>{
          // //console.log(id);
          
    
          // })
      
        
      }
  }


    
  

