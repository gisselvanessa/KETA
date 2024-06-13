import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns'; 

@Component({
  selector: 'app-ticket-table-operador',
  templateUrl: './ticket-table-operador.component.html',
  styleUrls: ['./ticket-table-operador.component.css']
})
export class TicketTableOperadorComponent implements OnInit {

  @Output() informacionEnviada = new EventEmitter<any>();

  constructor(private ticketservice : TicketService,
    private userservice : UserService,
    private linkservice : LinksService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService) { }
    listaTareaEstadoColor: any = [];
    listaAllTareasAsignadas : any =[];
    listaTareas: any = [];
    listaTareasEnTramite: any = [];
    listaTareasAbierto: any = [];
    listaTareasAsignado: any = [];
    listaTareasPendiente: any = [];
    usuario: any = {};
    items1: MenuItem[] = [];
    items2: MenuItem[] = [];
    items3: MenuItem[] = [];
    tareaUsuario: any = {};
    tareaEscogidaAbierta: any = {};
    tareaEscogidaTramite: any = {};
    tareaEscogidaAsignada: any = {};
    tareaEscogidaPendiente: any = {};
    tareaEscogidaEnEspera: any = {};
    modalSubtarea: boolean = false;
    mostrarModalVerTarea: boolean = false;
    mostrarModalAsignacion : boolean  = false ;
    mostrarModalAsignacionPendiente : boolean  = false ;
    descripcionsubtarea: string = '';
    keyFikterLetras: RegExp = /^[A-Za-z\s]+$/;
    keyFilterEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    regexnumber: RegExp = /^[0-9]+$/;
    listaUsuarios: any = [];
    tipoEstado: any = {};
    descripciontarea: string = '';
    ticketCreado: any = [];
    loadingData: boolean = false;
  tareaEscogidaColor: any = {};
  value: number = 0;
  listaSubtareasEnTramite: any = [];
  subtareaEscogida: any = {};

  mostrarModalVerTareaEnTramite: boolean = false;
  mostrarModalRegistroActividadTareaP: boolean = false;
  listaActividadesSubtareas: any = [];
  listaActividadesTareaP: any = {};
  listaActividadesTareaPSubtareas: any = [];
  listaActividadesTareaPSubtareasValues: any = [];
  listaActividadesTareaPSubtareasaux: any = [];
  estadotareaseleccionado : any ={};

  descripcionactividad: string ='';
  tituloactividad: string ='';
  descripcionArchivo: string = '';
  activeIndexAssign: number = 0;
  activeIndexActivities: number = 0;
  activeIndexForm: number = 0;

  descripcionresolucion:  string = '';
  observacionmonto: string = '';
  montoresolucion: number = 0;
  interesmontoresolucion: number = 0;
  totalmontoresolucion: number = 0;

  mostrarModalRegistroActividadSubtarea: boolean = false;
  clasificacionresolucionseleccionada :any = {};
  tiporesolucionseleccionada :any = {};
  listaEstadosTareasP: any = [];

  listaTipoResoluciones : any =[];
  listaClasificacionesResoluciones : any =[];
  listaEstados: any = [];
  listaEstadosSubtareas: any = [];

    listaUsuarios2: any = [
      {
        "first_name": "Christian Bladimir",
        "last_name": "Sisa Maliza",
        "idusuario": 1,
        "idrol": "http://localhost:8001/users/api/roles/1/",
        "idpersona": "http://localhost:8001/users/api/personas/3/",
        "iddepartamento": "http://localhost:8001/users/api/departamentos/2/",
        "idcargo": "http://localhost:8001/users/api/cargos/2/",
        "is_active": true,
        "direccionmac": "91:37:bd:f4:9d:08",
        "date_joined": null,
        "fechamodificacion": null,
        "ipcreacion": "186.101.18.252",
        "ipmodificacion": null,
        "email": "Csisa@pilahuintio.ec",
        "username": "uno",
        "is_staff": true,
        "is_superuser": false,
        "last_login": "2023-07-31T21:52:55.689824Z",
        "password": "pbkdf2_sha256$600000$oPPageSDn59Wvbmt6dpj0E$/UCVbMZGQLRyDPgYVX1U9UukWNDail3eGe/AoP62NIs=",
        "fecharegistro": null,
        "url": "http://localhost:8001/users/api/usuarios/1/",
        "nombrerol": "Supervisor",
        "rol": 1,
        "nombredepartamento": "Información",
        "descripcioncargo": "Jefe operativo"
      }
    ];
    usuarioseleccionado: any = {};
    idUsuario: string = '';
    verTareaDialog: any = {};

    async ngOnInit() {

      await this.getUsuario();
      await this.obtenerUsuario();
      await this.getAllTareas();
      this.obtenerEstado();
      
  
  
      this.items1 = [
        {
          icon: 'pi pi-user',
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Asignar ticket',
            tooltipPosition: 'top'
          } ,
          command: () => {
            this.mostrarModalAsignacion = true;
            
          }
        },
        {
          icon: "fa-solid fa-eye",
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Ver detalles',
            tooltipPosition: 'top'
          } ,
  
          // icon: 'pi pi-user',
          command: () => {
            this.verTareaAbierto();
          }
        },
      ];
      this.items2 = [
        {
          icon: 'pi pi-user',
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Asignar ticket',
            tooltipPosition: 'top'
          } ,
          command: () => {
            this.mostrarModalAsignacionPendiente = true;
            
          }
        },
        {
          icon: "fa-solid fa-eye",
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Ver detalles',
            tooltipPosition: 'top'
          } ,
  
          // icon: 'pi pi-user',
          command: () => {
            this.verTareaPendiente();
          }
        },
      ];
      this.items3 = [
        {
          icon: 'fa-solid fa-gear',
          // style: '{background-color:red}',
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Crear tarea',
            tooltipPosition: 'top'
          } ,
          command: () => {
            this.mostrarModalSubtarea();
            this.messageService.add({ severity: 'info', summary: 'Crear Subtarea', detail: 'Ingrese usuario al que desea asignar subtarea' });
          }
        },
        {
          icon: "fa-solid fa-eye",
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Ver detalles',
            tooltipPosition: 'top'
          } ,
  
          // icon: 'pi pi-user',
          command: () => {
            this.verTareaEnTramite();
          }
        },
        {
          icon: "fa-solid fa-book",
          tooltipOptions: {
            appendTo:'body',
            tooltipLabel:'Actividades',
            tooltipPosition: 'top'
          } ,
          command: () => {
            this.registrarActividadTareaPrincipal();
          }
        },
        // {
        //   icon: 'fa-solid fa-thumbs-down',
        //   tooltip: 'Rechazar',
        //   command: () => {
        //     this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Ticket cerrado' });
        //   }
        // },
      ];
  
      await this.getAllUsers();
      await this.getTareaEstadoColor();

      await this.getAllTareasAsignadas();
      await this.obtenerAllEstados();
    await this.obtenerTipoResoluciones();
    await this.obtenerClasificacionesResoluciones();
  }




  async obtenerTipoResoluciones(){
    this.listaTipoResoluciones = await firstValueFrom(this.ticketservice.getTipoResoluciones());
  }
  
  async obtenerClasificacionesResoluciones(){
    this.listaClasificacionesResoluciones = await firstValueFrom(this.ticketservice.getClasificacionesResoluciones());
    
  }

  async verTareaEnTramite() {
    this.mostrarModalVerTareaEnTramite = true;
    this.verTareaDialog = this.tareaEscogidaTramite;
    

  }

  
  async obtenerAllEstados(){
    this.listaEstados = await firstValueFrom(this.userservice.getEstados());

    this.listaEstadosTareasP= this.listaEstados.filter((estado:any )=>{
      return estado.idestado === 4 || estado.idestado === 5 || estado.idestado === 7;
    })

    this.listaEstadosSubtareas= this.listaEstados.filter((estado:any )=>{
      return estado.idestado > 3 && estado.idestado < 7;
    })
    
  }


  async  registrarActividadTareaPrincipal(){
    this.mostrarModalRegistroActividadTareaP = true;
    this.obtenerActividadesTareaPrincipal();

    const {tarea} = this.tareaEscogidaTramite;
  
    const {idestado} = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea));

    this.estadotareaseleccionado = await firstValueFrom(this.linkservice.getUrl(idestado));

  }

  async getTareaEstadoColor() {
    try {
      const { url, idusuario } = this.usuario;
    
      this.listaTareaEstadoColor = await firstValueFrom(this.ticketservice.obtenerTareaEstadoColor(idusuario));
    
      this.listaTareaEstadoColor = this.listaTareaEstadoColor.filter((tarea: any) => {
        return tarea.descripcionestado !== 'Resuelto';
      });
      this.informacionEnviada.emit(this.listaTareaEstadoColor);
    } catch (error) {
      console.error('Error al obtener la lista de tareas:', error);
      this.messageService.add({ severity: 'info', summary: 'Sin casos en proceso', detail: 'No estas trabajando en ningún caso' });
      
      // Aquí puedes realizar acciones adicionales si se produce un error, como mostrar un mensaje de error al usuario.
    }
  
  }



  async getAllTareasAsignadas(){
    this.listaAllTareasAsignadas= await firstValueFrom(this.ticketservice.getAllTareasEstadoColor())
    
  }


  async obtenerActividadesTareaPrincipal() {
    try {
    
      this.listaActividadesTareaP = await firstValueFrom(this.ticketservice.getActividadesxId(this.tareaEscogidaTramite.tarea));
    
      this.listaActividadesTareaPSubtareas = this.listaActividadesTareaP.subtasks;
    
    } catch (error) {
      console.error('Error al obtener las actividades de la tarea principal:', error);
      this.messageService.add({ severity: 'info', summary: 'No existen actividades', detail: 'No existen actividades para este ticket' });

      // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario.
    }
  }


  async asignarTicket() {
     const usuarioUrl = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const tareas = {
      // idtarea:'',
      descripciontarea: this.descripciontarea,
      indicador: 'P',
      // fechaasignacion: new Date(),
      //fechaentrega:'',
      // archivo:'cdcdcscsd',
      // fecharegistro:'',
      // fkidtarea:'',
      idestado: this.tipoEstado.url,
      // idprioridad:1,
      idproblema: this.tareaEscogidaAbierta.idproblema,
      idusuarioasignado: usuarioUrl.url,
      idusuarioqasigno: this.idUsuario,
      // tareaprincipal:1
    }

    this.ticketservice.updateTarea(tareas, this.tareaEscogidaAbierta.idtarea).subscribe(res => {
      this.cerrarModalAsignacion();
      this.messageService.add({ severity: 'success', summary: 'Tarea asignada!', detail: 'La tarea se asignó exitosamente' });

    },
      error => {
        this.cerrarModalAsignacion();

        this.messageService.add({ severity: 'error', summary: 'Tarea no asignada', detail: 'La tarea no se ha asignado correctamente' });

      }
    )


  }


  async verTareaAbierto() {
    this.loadingData = true;

    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaAbierta;
    const { idproblema } = this.verTareaDialog;
    const problemaDialog = await firstValueFrom(this.linkservice.getUrl(idproblema));

    const { numeroticket, idsucursal,  idtipoticket, idtipocomentario, descripcionasunto, idpersona } = problemaDialog;
    const {  idestado, idusuarioasignado, idprioridad, idusuarioqasigno } =  this.tareaEscogidaAbierta;

    this.verTareaDialog.numeroticket = numeroticket;

    const agenciaDialog = idsucursal == null ? ''
    
      : await firstValueFrom(this.linkservice.getUrl(idsucursal));
    const tipoReclamoDialog = await firstValueFrom(this.linkservice.getUrl(idtipoticket));
    // const tipoComentarioDialog = await firstValueFrom(this.linkservice.getUrl(idtipocomentario));
    const tipoComentarioDialog = idtipocomentario == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idtipocomentario));

      const estadoDialog = idestado == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idestado));

    const prioridadDialog = idprioridad == null ? ''
    : await firstValueFrom(this.linkservice.getUrl(idprioridad));
    
      const usuarioasignadoDialog = idusuarioasignado == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idusuarioasignado));

      const usuarioqasignoDialog = idusuarioqasigno == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idusuarioqasigno));


    const personaDialog = await firstValueFrom(this.linkservice.getUrl(idpersona));

    this.verTareaDialog.nombresucursal = agenciaDialog.nombresucursal;
    this.verTareaDialog.descripcionasunto = descripcionasunto;
    this.verTareaDialog.tipoReclamo = tipoReclamoDialog.descripciontipoticket;
    this.verTareaDialog.prioridad = prioridadDialog.descripcionprioridad;
    this.verTareaDialog.tipoComentario = tipoComentarioDialog.descripciontipocomentario;
    this.verTareaDialog.persona = personaDialog.nombre +' '+personaDialog.apellido;
    this.verTareaDialog.identificacion = personaDialog.identificacion;
    this.verTareaDialog.estado = estadoDialog.descripcionestado;
    this.verTareaDialog.usuarioasignado = usuarioasignadoDialog.first_name +' '+usuarioasignadoDialog.last_name;
    this.verTareaDialog.usuarioqasigno = usuarioqasignoDialog.first_name+' '+usuarioqasignoDialog.last_name;

    this.loadingData = false;

  }



  async asignarTicketPendiente() {

    const usuarioUrl = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const tareas = {
      // idtarea:'',
      descripciontarea: this.descripciontarea,
      indicador: 'P',
      // fechaasignacion: new Date(),
      //fechaentrega:'',
      // archivo:'cdcdcscsd',
      // fecharegistro:'',
      // fkidtarea:'',
      idestado: this.tipoEstado.url,
      // idprioridad:1,
      idproblema: this.tareaEscogidaPendiente.idproblema,
      idusuarioasignado: usuarioUrl.url,
      idusuarioqasigno: this.idUsuario,
      // tareaprincipal:1
    }

    this.ticketservice.updateTarea(tareas, this.tareaEscogidaPendiente.idtarea).subscribe(res => {
      this.cerrarModalAsignacion();
      this.messageService.add({ severity: 'success', summary: 'Tarea asignada!', detail: 'La tarea se asignó exitosamente' });

    },
      error => {
        this.cerrarModalAsignacion();

        this.messageService.add({ severity: 'error', summary: 'Tarea no asignada', detail: 'La tarea no se ha asignado correctamente' });

      }
    )


  }

  /**
   * 
   * @param timestamp 
   * @returns retorna el formato de fecha basico
   */
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy HH:mm');
  }



  async getAllUsers() {

    this.userservice.get_all_vusers().subscribe({
      next: (data: any) => {
        this.listaUsuarios = data;
      }
    })

  }

  async obtenerEstado() {
    this.tipoEstado = await firstValueFrom(
      this.userservice.getEstadosId(3))
  }


  /**
   * 
   */
  async tomarTareaAsignada() {

    this.confirmationService.confirm({
      message: '¿Estás seguro de tomar esta tarea?',
      accept: async () => {
        //Actual logic to perform a confirmation

        const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));

        const { url: urlTramite } = idestadotramite;
        const { idtarea } = this.tareaEscogidaAsignada;


        this.tareaEscogidaAsignada.idestado = urlTramite;


        this.tareaEscogidaAsignada.archivo = "";

        this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
          next: (data: any) => {
            this.getAllTareas();

          },
          error: (err: any) => {
            //console.log('No se pudo actualizar');

          }
        })



      },
      reject: async () => {
        const idestadoabierto = await firstValueFrom(this.userservice.getEstadosId(1));

        const { url: urlAbierto } = idestadoabierto;

        this.tareaEscogidaEnEspera.idestado = urlAbierto;

        this.getAllTareas();
      }
    });
  }





  async tomarTarea() {

    this.confirmationService.confirm({
      message: '¿Estás seguro de tomar esta tarea?',
      accept: async () => {
        //Actual logic to perform a confirmation

        const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(3));

        const { url: urlTramite } = idestadotramite;
        const { idtarea } = this.tareaEscogidaAbierta;


        this.tareaEscogidaAbierta.idestado = urlTramite;


        this.tareaEscogidaAbierta.archivo = "";

        this.ticketservice.updateTarea(this.tareaEscogidaAbierta, idtarea).subscribe({
          next: (data: any) => {
            this.getAllTareas();

          },
          error: (err: any) => {
            //console.log('No se pudo actualizar');

          }
        })



      },
      reject: async () => {
        const idestadoabierto = await firstValueFrom(this.userservice.getEstadosId(1));

        const { url: urlAbierto } = idestadoabierto;

        this.tareaEscogidaEnEspera.idestado = urlAbierto;

        this.getAllTareas();
      }
    });
  }
/**
 * 
 */



  async verTarea() {

    
    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaAbierta;
    const { idproblema } = this.verTareaDialog;
    const problemaDialog = await firstValueFrom(this.linkservice.getUrl(idproblema));

    const { numeroticket, idsucursal, idtipoticket, idtipocomentario, descripcionasunto, idpersona } = problemaDialog;
    this.verTareaDialog.numeroticket = numeroticket;

    const agenciaDialog = await firstValueFrom(this.linkservice.getUrl(idsucursal));
    const tipoReclamoDialog = await firstValueFrom(this.linkservice.getUrl(idtipoticket));
    const tipoComentarioDialog = idtipocomentario == null ? ''
    : await firstValueFrom(this.linkservice.getUrl(idtipocomentario));
    const personaDialog = await firstValueFrom(this.linkservice.getUrl(idpersona));


    this.verTareaDialog.nombresucursal = agenciaDialog.nombresucursal;
    this.verTareaDialog.descripcionasunto = descripcionasunto;
    this.verTareaDialog.tipoReclamo = tipoReclamoDialog.descripciontipoticket;
    this.verTareaDialog.tipoComentario = tipoComentarioDialog.descripciontipocomentario;
    this.verTareaDialog.persona = personaDialog.nombre;

  }

  
  async verTareaAsignado() {
    
    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaAsignada;
    const { idproblema } = this.verTareaDialog;
    const problemaDialog = await firstValueFrom(this.linkservice.getUrl(idproblema));

    const { numeroticket, idsucursal, idtipoticket, idtipocomentario, descripcionasunto, idpersona } = problemaDialog;
    this.verTareaDialog.numeroticket = numeroticket;

    const agenciaDialog = await firstValueFrom(this.linkservice.getUrl(idsucursal));
    const tipoReclamoDialog = await firstValueFrom(this.linkservice.getUrl(idtipoticket));
    // const tipoComentarioDialog = await firstValueFrom(this.linkservice.getUrl(idtipocomentario));
    const tipoComentarioDialog = idtipocomentario == null ? ''
    : await firstValueFrom(this.linkservice.getUrl(idtipocomentario));
    const personaDialog = await firstValueFrom(this.linkservice.getUrl(idpersona));


    this.verTareaDialog.nombresucursal = agenciaDialog.nombresucursal;
    this.verTareaDialog.descripcionasunto = descripcionasunto;
    this.verTareaDialog.tipoReclamo = tipoReclamoDialog.descripciontipoticket;
    this.verTareaDialog.tipoComentario = tipoComentarioDialog.descripciontipocomentario;
    this.verTareaDialog.persona = personaDialog.nombre;

  }

   async verTareaPendiente() {
    this.loadingData = true;

    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaPendiente;
    const { idproblema } = this.verTareaDialog;
    const problemaDialog = await firstValueFrom(this.linkservice.getUrl(idproblema));

    const { numeroticket, idsucursal,  idtipoticket, idtipocomentario, descripcionasunto, idpersona } = problemaDialog;
    const {  idestado, idusuarioasignado, idprioridad, idusuarioqasigno } =  this.tareaEscogidaPendiente;

    this.verTareaDialog.numeroticket = numeroticket;


    const agenciaDialog = idsucursal == null ? ''
    
      : await firstValueFrom(this.linkservice.getUrl(idsucursal));
    const tipoReclamoDialog = await firstValueFrom(this.linkservice.getUrl(idtipoticket));
    // const tipoComentarioDialog = await firstValueFrom(this.linkservice.getUrl(idtipocomentario));
    const tipoComentarioDialog = idtipocomentario == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idtipocomentario));

      const estadoDialog = idestado == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idestado));

    const prioridadDialog = idprioridad == null ? ''
    : await firstValueFrom(this.linkservice.getUrl(idprioridad));
    
      const usuarioasignadoDialog = idusuarioasignado == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idusuarioasignado));

      const usuarioqasignoDialog = idusuarioqasigno == null ? ''
      : await firstValueFrom(this.linkservice.getUrl(idusuarioqasigno));


    const personaDialog = await firstValueFrom(this.linkservice.getUrl(idpersona));


    this.verTareaDialog.nombresucursal = agenciaDialog.nombresucursal;
    this.verTareaDialog.descripcionasunto = descripcionasunto;
    this.verTareaDialog.tipoReclamo = tipoReclamoDialog.descripciontipoticket;
    this.verTareaDialog.prioridad = prioridadDialog.descripcionprioridad;
    this.verTareaDialog.tipoComentario = tipoComentarioDialog.descripciontipocomentario;
    this.verTareaDialog.persona = personaDialog.nombre +' '+personaDialog.apellido;
    this.verTareaDialog.identificacion = personaDialog.identificacion;
    this.verTareaDialog.estado = estadoDialog.descripcionestado;
    this.verTareaDialog.usuarioasignado = usuarioasignadoDialog.first_name +' '+usuarioasignadoDialog.last_name;
    this.verTareaDialog.usuarioqasigno = usuarioqasignoDialog.first_name+' '+usuarioqasignoDialog.last_name;

    this.loadingData = false;

  }


/***
 * 
 */

  mostrarModalSubtarea() {
    this.modalSubtarea = true;

  }
  limpiarCampos(){
    this.descripciontarea=  '';
    this.usuarioseleccionado = {};


  }

/***
 * 
 */

  cerrarModalSubtarea() {
    this.modalSubtarea = false;
    // this.limpiarCampos();
    // this.limpiarCamposReclamos();
    // this.activeIndex = 0;
    // this.descripciontarea = '';
    // this.usuarioseleccionado = {};
  }

  cerrarModalAsignacion() {
    this.mostrarModalAsignacion = false;
    this.modalSubtarea = false;

    this.mostrarModalAsignacionPendiente =false;
    this.limpiarCampos();
    // this.limpiarCamposReclamos();
    // this.activeIndex = 0;
    // this.descripciontarea = '';
    // this.usuarioseleccionado = {};
    this.getAllTareas();
  }
  cerrarModalVerTarea() {
    this.mostrarModalVerTarea = false;
    this.mostrarModalVerTareaEnTramite =  false;
    
    this.verTareaDialog = {}
  }
 

  
  crearSubtarea() {

    const subtarea = {
      descripciontarea: this.descripcionsubtarea,
      indicador: 'A',
      fkidtarea: this.tareaEscogidaTramite.url,
      // idprioridad:,
      // idproblema: url,
      // idestado: 
      idestado: this.tipoEstado.url,
      idusuarioasignado: this.usuarioseleccionado.url,
      idusuarioqasigno: this.idUsuario,
      tareaprincipal: this.tareaEscogidaTramite.url
    }
    //console.log(subtarea);

    this.ticketservice.crearTarea(subtarea).subscribe(res => {
      this.cerrarModalAsignacion();
      this.messageService.add({ severity: 'success', summary: 'Tarea asignada!', detail: 'La tarea se asignó exitosamente' });

    },
      error => {
        this.cerrarModalAsignacion();

        this.messageService.add({ severity: 'error', summary: 'Tarea no asignada', detail: 'La tarea no se ha asignado correctamente' });

      }
    )

  }





  async obtenerUsuario() {
    const user = await firstValueFrom(this.userservice.get_usuario(String(localStorage.getItem('user'))))
    const { url } = user;
    this.idUsuario = url;
  }

  tareaEscogida(tareaA: any) {
    //console.log('Edcogi esta tarea');
    // //console.log(tareaA);
    this.tareaEscogidaAbierta = tareaA;
    //console.log(this.tareaEscogidaAbierta);
    



  }

  tareaEscogidaEnTramite(tareaT: any) {
    //console.log('Edcogi esta tarea');
    //console.log(tareaT);
    this.tareaEscogidaTramite = tareaT;

  }

  tareaEscogidaenAsignacion(tareaAs: any) {
    //console.log('Edcogi esta tarea');
    //console.log(tareaAs);
    this.tareaEscogidaAsignada = tareaAs;

  }

  
  tareaEscogidaPend(tareaP: any) {
    //console.log('Edcogi esta tarea');
    //console.log(tareaP);
    this.tareaEscogidaPendiente = tareaP;

  }




  async getAllTareas() {

    const { url, idusuario } = this.usuario;

    //console.log(url);

    this.listaTareasEnTramite = await firstValueFrom(this.ticketservice.obtenerFiltroTarea(idusuario, 4))
    //console.log(this.listaTareasEnTramite);


    this.listaTareasEnTramite = await Promise.all(this.listaTareasEnTramite.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
      //   return tarea.idusuarioasignado == url && tarea.descripcionestado == 'En Trámite';
      return tarea;

    }));
    // })
    this.listaTareasAbierto = await firstValueFrom(this.ticketservice.obtenerFiltroTarea('', 1))
    //console.log(this.listaTareasAbierto);


    this.listaTareasAbierto = await Promise.all(this.listaTareasAbierto.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;


      const { idestado } = tarea;
      const idestadoPromise = this.linkservice.getUrl(idestado).toPromise();
      const estado: any = await idestadoPromise;
      const { descripcionestado } = estado;
      tarea.descripcionestado = descripcionestado;
      //   return tarea.idusuarioasignado == url && tarea.descripcionestado == 'En Trámite';
      return tarea;
    }));

    this.informacionEnviada.emit(this.listaTareasEnTramite);

    this.listaTareasAsignado = await firstValueFrom(this.ticketservice.obtenerFiltroTarea(idusuario, 3))
    //console.log(this.listaTareasAsignado);


    this.listaTareasAsignado = await Promise.all(this.listaTareasAsignado.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
      //   return tarea.idusuarioasignado == url && tarea.descripcionestado == 'En Trámite';
      return tarea;
    }));


    /** Lista de tareas Pendientes */
    this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerFiltroTarea('', 2))
    //console.log(this.listaTareasAsignado);


    this.listaTareasPendiente = await Promise.all(this.listaTareasPendiente.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
      //   return tarea.idusuarioasignado == url && tarea.descripcionestado == 'En Trámite';
      return tarea;
    }));
  }


  /***
   * obtiene el usuario desde la localStorage
   */
  async getUsuario() {

    const usuarioPromise = new Promise((resolve, reject) => {
      this.userservice.get_usuario(String(localStorage.getItem('user'))).subscribe(res => {
        resolve(res)
      })
    })
    this.usuario = await usuarioPromise.then(res => res);
    //console.log(this.usuario);



  }



  async tareaEscogidaEstadoColor(tarea: any, expanded: boolean) {
    //console.log('Ezcogi esta tarea');
    // //console.log(expanded);


    if (!expanded) {

      //console.log(tarea);
      this.tareaEscogidaColor = tarea;


      //console.log(this.tareaEscogidaColor);

      let count = 0;

      // //console.log(cantidadTareas);

      if (this.tareaEscogidaColor.subtasks.length > 0) {

        this.tareaEscogidaColor.subtasks.forEach((tareas: any) => {

          if (tareas.estado == 'Resuelto' || tareas.estado == 'Cerrado - Cancelado') {
            count++;
          }

          // //console.log(count);

        })
        if (count > 0) {
          count = Math.floor((count * 100) / this.tareaEscogidaColor.subtasks.length);
          this.value = count;
          this.tareaEscogidaColor.value = this.value;
          //console.log(this.tareaEscogidaColor.value);

        }
        else {
          this.value = 1;
          this.tareaEscogidaColor.value = this.value;


        }
      }

      else if (this.tareaEscogidaColor.descripcionestado == 'Resuelto' || this.tareaEscogidaColor.descripcionestado == 'Cerrado - Cancelado') {
        this.value = 100;
        this.tareaEscogidaColor.value = this.value;


      }
      else {
        this.value = 1;
        this.tareaEscogidaColor.value = this.value;

      }

    }
    else {
      this.tareaEscogidaColor = {};
      this.value = 1;
      this.tareaEscogidaColor.value = this.value;


    }


  }


  
  SubtareaEscogida(tarea: any) {
    //console.log('Edcogi esta tarea');
    //console.log(tarea);
    this.subtareaEscogida = tarea;

  }


  cerrarModalVerActividad() {
    // this.modalSubtarea = false;
    // this.descripciontarea = '';

    // // this.activeIndex = 0;
    // this.descripcionsubtarea = '';
    // this.usuarioseleccionado = {};
    // this.mostrarModalAsignacion = false;
    // this.mostrarModalRechazarAsignacion = false;

    // this.getAllTareas();
    // this.getTareaEstadoColor();
    this.descripcionactividad = '';
    this.tituloactividad ='';
    this.activeIndexActivities = 0;
    this.mostrarModalRegistroActividadSubtarea = false;
    this.mostrarModalRegistroActividadTareaP = false;
    this.listaActividadesSubtareas = [];
    this.listaActividadesTareaP = {};


    //RESOLUCION

    this.descripcionresolucion ='';
    this.montoresolucion = 0;
    this.clasificacionresolucionseleccionada= {};
    this.interesmontoresolucion = 0;
    this.tiporesolucionseleccionada = {};
    this.totalmontoresolucion = 0;
    this.observacionmonto = '';
    this.activeIndexForm = 0;

  }


  async guardarResolucion() {
    //console.log('Guardar resolucion');
    //console.log(this.tareaEscogidaTramite);
    const {tarea} = this.tareaEscogidaTramite;
    const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))
    //console.log(idTareaPrincipal);
    this.totalmontoresolucion = this.montoresolucion + this.interesmontoresolucion
    
      const nuevaResolucion = {
      "resolution": {
          "numeroresolucion": "three",
          "descripcionresolucion": this.descripcionresolucion,
          "idclasificacionresolucion": this.clasificacionresolucionseleccionada.url,
          "idtarea": idTareaPrincipal.url,
          "idtiporesolucion": this.tiporesolucionseleccionada.url
  
      },
      "values": {
          "monto": this.montoresolucion,
          "interesmonto": this.interesmontoresolucion,
          "totalmonto": this.totalmontoresolucion,
          "observacionmonto": this.observacionmonto
      }
      
  }
  
      //console.log(nuevaResolucion);
      // //console.log(this.usuarioseleccionado);
      
      this.ticketservice.guardarResolucion(nuevaResolucion).subscribe(res => {
        this.cerrarModalVerActividad();
        this.obtenerActividadesTareaPrincipal();
        this.activeIndexActivities=0;
        this.messageService.add({ severity: 'success', summary: 'Resolución registrada!', detail: 'La resolución se registró correctamente' });
  
      },
        error => {
          this.cerrarModalVerActividad();
          this.messageService.add({ severity: 'error', summary: 'Resolución no registrada', detail: 'La resolución no se ha registrado. Intente nuevamente' });
  
        }
      )
    }
   



    regresarActividades(){
      this.activeIndexForm = 0;
    }
/**
 * 
 * @param event crea un formData para registrarlo en la base
 */
    myUploader(event:any) {
      //console.log(event);
      
      const file = event.files[0];
      //console.log(event.target);
      //console.log(file);
      
      const formData = new FormData();
      //console.log(formData);
      
      formData.append('pdf_file', file);
      formData.append('idtarea', "http://localhost:8001/tasks/api/tareas/7/");
      formData.append('nombrearchivo', event.files[0].name);
      formData.append('descripcionarchivo', this.descripcionArchivo);
      formData.append('mimetypearchivo', "application/pdf");
      // formData.append('contenidoarchivo', "");
      // // Send the file to the backend
      // this.httpClient.post('your-backend-api-url', formData).subscribe(response => {
      //   // Handle the response from the backend
      // });
      this.ticketservice.subirPDF(formData).subscribe(resp=>{
        //console.log(resp);
        this.messageService.add({ severity: 'success', summary: 'Archivo Subido!', detail: 'El archivo se ha subido correctamente' });
        
      },
      error => {
        // this.cerrarModalAsignacion();
        //console.log(error);
        
        this.messageService.add({ severity: 'error', summary: 'Upload fallido', detail: error.statusText });
    
      }
      
      )
    }


    volverModalVerActividad(){
      this.activeIndexActivities=0;
    }

    async guardarActividadTareaPrincipal(type:string) {
      //console.log('Guardar actividad');
      //console.log(this.tareaEscogidaTramite);
      const {tarea} = this.tareaEscogidaTramite;
      const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))
      
      if(this.tituloactividad !== '' && this.descripcionactividad !==''){
        const nuevaActividad = {
          "tituloseguimientotarea": this.tituloactividad,
          "detalleresolucion": this.descripcionactividad,
          // "archivo": "",
          "idtarea": idTareaPrincipal.url,
        "idusuario": this.idUsuario

      }
    
    
        //console.log(nuevaActividad);
        // //console.log(this.usuarioseleccionado);
        
        this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
          // this.cerrarModalVerActividad();
          this.obtenerActividadesTareaPrincipal();
          this.activeIndexActivities=0;
          this.messageService.add({ severity: 'success', summary: 'Actividad registrada!', detail: 'La actividad se registró correctamente' });
    
        },
          error => {
            this.cerrarModalVerActividad();
            this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'La actividad no se ha registrado. Intente nuevamente' });
    
          }
        )
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'Hay campos vacíos.',
        });
      }
      
     
  
    }
  
async cambiarEstadoTareaP(){
  // const { url } = this.estadotareaseleccionado;
  //console.log(this.estadotareaseleccionado);
  //console.log(this.tareaEscogidaTramite.tarea);
  const idTareaPrincipal = this.tareaEscogidaTramite.tarea
  const estadoDescripcion = this.estadotareaseleccionado.descripcionestado.toUpperCase();

  
  const tareaUpdate = {
    idestado: this.estadotareaseleccionado.url
  }
  //console.log(tareaUpdate);

  this.ticketservice.updateTarea(tareaUpdate, idTareaPrincipal).subscribe(res => {
    // this.cerrarModalAsignacion();
    this.messageService.add({ severity: 'success', summary: 'Tarea actualizada!', detail: 'El estado de la tarea '+idTareaPrincipal+ ' se ha actualizado a estado '+estadoDescripcion});
    this.getAllTareas();
    this.getTareaEstadoColor();
  },
    error => {

      this.messageService.add({ severity: 'error', summary: 'Tarea no actualizada', detail: 'El estado de la tarea no se ha actualizado' });

    }
  )
if(this.estadotareaseleccionado.descripcionestado =='Cerrado - Cancelado'){
    this.activeIndexForm = 1;
  }
  
}


crearActividadTareaP(){
  this.activeIndexActivities = 1;
  //console.log('Crear actividad principal');
  
}




}