import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns';
import { toArray } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ticket-table-supervisor',
  templateUrl: './ticket-table-supervisor.component.html',
  styleUrls: ['./ticket-table-supervisor.component.css']
})
export class TicketTableSupervisorComponent implements OnInit {
  @Output() informacionEnviada = new EventEmitter<any>();

  constructor(private ticketservice: TicketService,
    private userservice: UserService,
    private linkservice: LinksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

    spinnerLoad3 :boolean = false;
    spinnerLoad4 :boolean = false;
    spinnerLoad2 :boolean = false;


  listaTareas: any = [];
  listaTareasEnTramite: any = [];
  listaTareasAbierto: any = [];
  listaTareasAsignado: any = [];
  listaTareasPendiente: any = [];
  listaTareasAbiertoYPendiente: any = [];
  listaArchivos: any = [];

  listaTareaEstadoColor: any = [];
  listaTareaEstadoColorPorCerrar: any = [];
  listaActividadesSubtareas: any = [];
  listaActividadesTareaP: any = {};
  listaActividadesTareaPAsignar: any = {};
  listaActividadesTareaPSubtareas: any = [];
  listaActividadesTareaPSubtareasAsignar: any = [];
  listaActividadesTareaPSubtareasValues: any = [];
  listaActividadesTareaPSubtareasaux: any = [];

  listaEstados: any = [];
  listaEstadosTareasP: any = [];
  listaEstadosSubtareas: any = [];
  listaEstadosResuelto: any = [];
  loadingData: boolean = false;
  tareaEscogidaColor: any = {};
    estadotareaseleccionado : any ={};
    estadosubtareaseleccionado : any ={};
  usuario: any = {};
  items1: MenuItem[] = [];
  items2: MenuItem[] = [];
  items3: MenuItem[] = [];
  items4: MenuItem[] = [];
  tareaUsuario: any = {};
  tareaEscogidaAbierta: any = {};
  tareaEscogidaTramite: any = {};
  tareaEscogidaAsignada: any = {};
  subtareaEscogida: any = {};
  tareaEscogidaEnEspera: any = {};
  listaSubtareasEnTramite: any = [];
  modalSubtarea: boolean = false;
  mostrarModalVerTarea: boolean = false;
  mostrarModalVerTareaEnTramite: boolean = false;
  mostrarModalVerTareasSinAsignacion: boolean = false;
  mostrarModalAsignacion: boolean = false;
  mostrarModalAceptarAsignacion: boolean = false;
  mostrarModalRechazarAsignacion: boolean = false;
  mostrarModalArchivos: boolean = false;
  mostrarModalRegistroActividadSubtarea: boolean = false;
  mostrarModalRegistroActividadTareaP: boolean = false;
  mostrarModalActividadTareaP: boolean = false;
  descripcionsubtarea: string = '';
  keyFikterLetras: RegExp = /^[A-Za-z\s]+$/;
  keyFilterEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  regexnumber: RegExp = /^[0-9]+$/;
  listaUsuarios: any = [];
  tipoEstado: any = {};
  tipoEstadoTramite: any = {};
  descripciontarea: string = '';
  descripcionactividad: string ='';
  tituloactividad: string ='';
  descripcionArchivo: string = '';
  ticketCreado: any = [];
  activeIndexAssign: number = 0;
  activeIndexActivities: number = 0;
  activeUpload: number = 0;
  activeIndexForm: number = 0;
  cargandoArchivos: boolean = false;

  descripcionresolucion:  string = '';
  idestadoseleccionadotareap:  number = 0;
  observacionmonto: string = '';
  montoresolucion: number = 0;
  interesmontoresolucion: number = 0;
  totalmontoresolucion: number = 0;


  date5: any = Date;
  maxDate: any = new Date();
  minDate: any = new Date();
  todayDate: any = new Date();
    listaTipoResoluciones : any =[];
    listaClasificacionesResoluciones : any =[];
  usuarioseleccionado: any = {};
  clasificacionresolucionseleccionada :any = {};
  tiporesolucionseleccionada :any = {};
  idUsuario: string = '';
  verTareaDialog: any = {};
  value: number = 0;
  loading: boolean = false;
  loading2: boolean = false;
  myfiles: any[] = [];


  async ngOnInit() {
    this.loading=true;
    this.loading2=true;
    this.items1 = [
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
      {
        
        
        tooltipOptions: {
          appendTo:'body',
          tooltipLabel:'Asignar ticket',
          tooltipPosition: 'top'
        } ,
        icon: 'pi pi-user',
        command: () => {
          this.mostrarModalAsignacion = true;

        }
      },
      {
        icon: "fa-solid fa-book",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Actividades',
          tooltipPosition: 'top'
        },
        command: () => {
          this.obtenerActividadTareaPrincipal();
        }
      },
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo:'body',
          tooltipLabel:'Documentos adjuntos',
          tooltipPosition: 'top'
        } ,
        icon: "pi pi-file-pdf",

        // icon: 'pi pi-user',
        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivos();
        }
      },

    ];
    this.items2 = [

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

      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo:'body',
          tooltipLabel:'Documentos adjuntos',
          tooltipPosition: 'top'
        } ,
        icon: "pi pi-file-pdf",

        // icon: 'pi pi-user',
        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivosTramite();
        }
      },

    ];
    await this.getUsuario();
    await this.obtenerUsuario();
    await this.getAllTareas();
    this.obtenerEstado();
    await this.getAllUsers();
    await this.getTareaEstadoColor();
    await this.obtenerAllEstados();
    await this.obtenerTipoResoluciones();
    await this.obtenerClasificacionesResoluciones();

  }
  async devolverTicket(event:any){



    this.confirmationService.confirm({
      target: event.target,
      message: `Estás seguro de devolver el Ticket N° ${this.tareaEscogidaTramite.tarea}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          //confirm action
          this.spinnerLoad4 = true;

            const tarea = {
            
              idestado: this.tipoEstadoTramite.url,
        
            }


            this.ticketservice.updateTarea(tarea, this.tareaEscogidaTramite.tarea ).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Ticket devuelto!', detail: 'El ticket ha sido devuelto para completar resolución' });
              this.spinnerLoad4 = false;
              this.getTareaEstadoColor();
              this.cerrarModalVerActividad();
            },
              error => {

                this.messageService.add({ severity: 'error', summary: 'Tarea no devuelta', detail: 'Hubo un error' });
                this.spinnerLoad4 = false;
              this.getTareaEstadoColor();

              });

      },
      reject: () => {
          //reject action
        
      }
  });



    
  }

  async downloadReporte(){
    
    const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = `${environment.apiUrl}reports/generate_pdf/${this.tareaEscogidaAbierta.tarea}` ;
      }
  }

  async downloadReporteTramite(){
    
    const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = `${environment.apiUrl}reports/generate_pdf/${this.tareaEscogidaTramite.tarea}` ;
      }
  }
  async tareaEscogidaEstadoColor(tarea: any, expanded: boolean) {

    if (!expanded) {

      this.tareaEscogidaColor = tarea;

      let count = 0;

      if (this.tareaEscogidaColor.subtasks.length > 0) {


        this.tareaEscogidaColor.subtasks.forEach((tareas: any) => {

          if (tareas.estado == 'Resuelto' || tareas.estado == 'Cerrado - Cancelado') {
            count++;
          }

        })
        if (count > 0) {
          count = Math.floor((count * 100) / this.tareaEscogidaColor.subtasks.length);
          this.value = count;
          this.tareaEscogidaColor.value = this.value;

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


  sendToUpload(){
    this.activeUpload = 1;
  }

  closeUpload(){
    this.activeUpload = 0;
    
  }

  async getTareaEstadoColor() {
    try {
      const { url, idusuario } = this.usuario;
  
      // Trae la lista de los tickets que están cerrados y resueltos
      this.listaTareaEstadoColorPorCerrar = await firstValueFrom(this.ticketservice.getAllTareasEstadoColor());
  
      // Filtra la lista para obtener solo tareas cuyo estado no es 'Resuelto'
      this.listaTareaEstadoColorPorCerrar = this.listaTareaEstadoColorPorCerrar.filter((tarea: any) => {
        return tarea.descripcionestado === 'Resuelto' || tarea.descripcionestado === 'Cerrado - Cancelado';
      });
    } catch (error) {
      console.error('Error al obtener la lista de tareas:', error);
      
      // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario.
    }
    this.loading2=false;

  }
  
  

  



  async asignarTicket() {
    this.spinnerLoad3 = true;

    const nuevoUsuarioAsignado = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const urlTarea = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAbierta.tarea))

      
    if(this.tareaEscogidaAbierta.indicador === 'P'){
      const tareas = {
        // idtarea:'',
        // descripciontarea: this.tareaEscogidaAbierta.descripciontarea,
        descripciontarea: 'Tarea principal: '+ this.descripciontarea,
        indicador: this.tareaEscogidaAbierta.indicador,
        fechaasignacion: new Date(),
        //fechaentrega:'',
        // archivo:'cdcdcscsd',
        // fecharegistro:'',
        // fkidtarea:'',
        idestado: this.tipoEstado.url,
        // idprioridad:1,
        idproblema: urlTarea.idproblema,
        idusuarioasignado: nuevoUsuarioAsignado.url,
        idusuarioqasigno: this.idUsuario,
        // tareaprincipal:1
      }
  
      this.ticketservice.updateTarea(tareas, this.tareaEscogidaAbierta.tarea ).subscribe(res => {
        this.cerrarModalAsignacion();
        this.messageService.add({ severity: 'success', summary: 'Tarea asignada!', detail: 'La tarea se asignó exitosamente' });
        this.spinnerLoad3 = false;

      },
        error => {
          this.cerrarModalAsignacion();
  
          this.messageService.add({ severity: 'error', summary: 'Tarea no asignada', detail: 'La tarea no se ha asignado correctamente' });
          this.spinnerLoad3 = false;

        }
      )
    }
    else{
      const tareas = {
        // idtarea:'',
        // descripciontarea: this.tareaEscogidaAbierta.descripciontarea,
        descripciontarea: 'Subtarea: '+ this.descripciontarea,
        indicador: this.tareaEscogidaAbierta.indicador,
        // fechaasignacion: new Date(),
        //fechaentrega:'',
        // archivo:'cdcdcscsd',
        // fecharegistro:'',
        // fkidtarea:'',
        idestado: this.tipoEstado.url,
        // idprioridad:1,
        idproblema: this.tareaEscogidaAbierta.idproblema,
        idusuarioasignado: nuevoUsuarioAsignado.url,
        idusuarioqasigno: this.idUsuario,
        // tareaprincipal:1
      }
  
      this.ticketservice.updateTarea(tareas, this.tareaEscogidaAbierta.idtarea).subscribe(res => {
        this.cerrarModalAsignacion();
        this.messageService.add({ severity: 'success', summary: 'Subtarea asignada!', detail: 'La subtarea se asignó exitosamente' });
        this.spinnerLoad3 = false;

      },
        error => {
          this.cerrarModalAsignacion();
  
          this.messageService.add({ severity: 'error', summary: 'Subtarea no asignada', detail: 'La subtarea no se ha asignado correctamente' });
          this.spinnerLoad3 = false;

        }
      )
    }

   


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

  async obtenerActividadesTareaPrincipalAsignar() {
    try {
    
      this.listaActividadesTareaPAsignar = await firstValueFrom(this.ticketservice.getActividadesxId(this.tareaEscogidaAbierta.tarea));
    
      this.listaActividadesTareaPSubtareasAsignar = this.listaActividadesTareaPAsignar.subtasks;
    
    } catch (error) {
      console.error('Error al obtener las actividades de la tarea principal:', error);
      this.messageService.add({ severity: 'info', summary: 'No existen actividades', detail: 'No existen actividades para este ticket' });

      // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario.
    }
  }



async obtenerTipoResoluciones(){
  this.listaTipoResoluciones = await firstValueFrom(this.ticketservice.getTipoResoluciones());
}

async obtenerClasificacionesResoluciones(){
  this.listaClasificacionesResoluciones = await firstValueFrom(this.ticketservice.getClasificacionesResoluciones());
}

async obtenerActividadesSubtarea() {
  try {
    this.listaActividadesSubtareas = await firstValueFrom(this.ticketservice.getActividadesxId(this.subtareaEscogida.idtarea));
  } catch (error) {
    
    this.messageService.add({ severity: 'info', summary: 'No existen actividades', detail: 'No existen actividades para este ticket' });

  }
}


  async rechazarAsignacion() {
    const idestadoabierto = await firstValueFrom(this.userservice.getEstadosId(1));

    const { url: urlAbierto } = idestadoabierto;
    const { idtarea } = this.tareaEscogidaAsignada;

    this.tareaEscogidaAsignada.idestado = urlAbierto;

    this.tareaEscogidaAsignada.archivo = "";

    this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
      next: (data: any) => {
        this.getAllTareas();
        this.messageService.add({ severity: 'success', summary: 'Tarea rechazada', detail: 'La tarea se ha enviado al operador' });
        this.mostrarModalRechazarAsignacion = false;
        this.mostrarModalAceptarAsignacion = false;

      },
      error: (err: any) => {
        //console.log('No se pudo actualizar');
        this.messageService.add({ severity: 'error', summary: 'Proceso incompleto', detail: 'La tarea no pudo cambiar de estado' });

        this.mostrarModalRechazarAsignacion = false;
        this.mostrarModalAceptarAsignacion = false;
      }
    })


  }



  async obtenerEstado() {
    this.tipoEstado = await firstValueFrom(
      this.userservice.getEstadosId(3))

      this.tipoEstadoTramite = await firstValueFrom(
        this.userservice.getEstadosId(4))
  }


  
  async obtenerAllEstados(){
    this.listaEstados = await firstValueFrom(this.userservice.getEstados());

    this.listaEstadosTareasP= this.listaEstados.filter((estado:any )=>{
      return estado.idestado > 3;
    })

    this.listaEstadosSubtareas= this.listaEstados.filter((estado:any )=>{
      return estado.idestado > 3 && estado.idestado < 7;
    })

    this.listaEstadosResuelto= this.listaEstados.filter((estado:any )=>{
      return estado.idestado > 5;
    })
    
  }


  /**
   * 
   */

  async tomartareaConf() {
    if(this.tareaEscogidaAsignada.indicador === 'P'){
      this.activeIndexAssign = 1;

      const prioridad = await firstValueFrom(this.linkservice.getUrl(this.tareaEscogidaAsignada.idprioridad));
      this.maxDate = new Date(this.tareaEscogidaAsignada.fechaentrega);
      this.minDate = new Date(this.tareaEscogidaAsignada.fechaentrega);
  
  
      if (prioridad.codigoprioridad === 'B') {
        this.maxDate.setDate(this.maxDate.getDate() + 14);
      }
      else if (prioridad.codigoprioridad === 'M') {
        this.maxDate.setDate(this.maxDate.getDate() + 8);
      }
      else if (prioridad.codigoprioridad === 'A') {
        this.maxDate.setDate(this.maxDate.getDate() + 5);
      }
    }
    else{
      this.activeIndexAssign = 2;

    }
  }




  async tomarTareaAsignada() {

    const tareaColor = {
      idtarea: "",
      tiemporequerido: null,
    };


    const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));

    const { url: urlTramite } = idestadotramite;
    const { idtarea } = this.tareaEscogidaAsignada;


    this.tareaEscogidaAsignada.idestado = urlTramite;


    this.tareaEscogidaAsignada.archivo = "";

    tareaColor.idtarea = this.tareaEscogidaAsignada.url;

    if (this.tareaEscogidaAsignada.indicador === 'P') {

      this.ticketservice.enviarTareaColor(tareaColor).subscribe({

        next: (data: any) => {

          this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
            next: (data: any) => {
              this.getAllTareas();
              this.getTareaEstadoColor();
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
              this.date5 = "";


            },
            error: (err: any) => {
              //console.log('No se pudo actualizar');
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });

            }
          })


        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');

        }
      })
    }
    else {
      this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
        next: (data: any) => {
          this.getAllTareas();
          this.getTareaEstadoColor();
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
          this.date5 = "";


        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });

        }
      })
    }

  }
  async tomarTareaAsignadaCambioFecha() {

    const tareaColor = {
      idtarea: "",
      tiemporequerido: null,
    };


    const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));

    const { url: urlTramite } = idestadotramite;
    const { idtarea } = this.tareaEscogidaAsignada;

    this.tareaEscogidaAsignada.idestado = urlTramite;

    this.tareaEscogidaAsignada.archivo = "";

    tareaColor.idtarea = this.tareaEscogidaAsignada.url;

    this.date5.setHours(11);
    this.date5.setMinutes(59);
    this.date5.setSeconds(59);
    this.date5.setMilliseconds(123);

    tareaColor.tiemporequerido = this.date5;


    if (this.tareaEscogidaAsignada.indicador === 'P') {

      this.ticketservice.enviarTareaColor(tareaColor).subscribe({

        next: (data: any) => {
          this.tareaEscogidaAsignada.fechaentrega = this.date5;
          this.tareaEscogidaAsignada.idestado = urlTramite;

          this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
            next: (data: any) => {
              this.getAllTareas();
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
              this.date5 = "";

            },
            error: (err: any) => {
              //console.log('No se pudo actualizar');
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });



            }
          })


        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.mostrarModalAceptarAsignacion = false;


        }
      })

    }
    else {
      this.ticketservice.updateTarea(this.tareaEscogidaAsignada, idtarea).subscribe({
        next: (data: any) => {
          this.getAllTareas();
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
          this.date5 = "";

        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });



        }
      })
    }





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

        this.tareaEscogidaAbierta.idusuarioasignado = this.idUsuario;


        this.ticketservice.updateTarea(this.tareaEscogidaAbierta, idtarea).subscribe({
          next: (data: any) => {
            this.getAllTareas();
            this.messageService.add({ severity: 'success', summary: 'Tarea tomada!', detail: 'La tarea se asignó exitosamente' });


          },
          error: (err: any) => {
            //console.log('No se pudo actualizar');
            this.messageService.add({ severity: 'error', summary: 'Tarea no tomada', detail: 'La tarea no se ha asignado correctamente' });


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

  async verTareaEnTramite() {
    this.mostrarModalVerTareaEnTramite = true;
    this.verTareaDialog = this.tareaEscogidaTramite;
    

  }


  async verTareaPendiente() {
    this.loadingData = true;
    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaAbierta;
    this.loadingData = false;

  }

  /***
   * 
   */

  mostrarModalSubtarea() {
    //console.log('subtarea');
    this.modalSubtarea = true;

  }


  /***
   * 
   */

  cerrarModalSubtarea() {
    this.modalSubtarea = false;

  }


  cerrarModalVerActividad() {

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

  cerrarModalAceptarAsignacion() {
    this.mostrarModalAceptarAsignacion = false;
    this.modalSubtarea = false;
    this.activeIndexAssign = 0;

    this.getAllTareas();
  }

  cerrarModalVerTarea() {
    this.mostrarModalVerTarea = false;
    this.mostrarModalVerTareaEnTramite =false;
    this.verTareaDialog = {}
    this.mostrarModalVerTareasSinAsignacion = false
  }




  async crearSubtarea() {
    const problema: any = await firstValueFrom(

      this.ticketservice.obtenerTicketId(this.tareaEscogidaTramite.idproblema)
    )
    const nuevoUsuarioAsignado = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))


    const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaTramite.tarea))



    const subtarea = {

      descripciontarea: 'Sub-tarea: ' + this.descripcionsubtarea,
      indicador: 'A',
      fkidtarea: idTareaPrincipal.url,
      idproblema: problema.url,
      idestado: this.tipoEstado.url,
      idusuarioasignado: nuevoUsuarioAsignado.url,
      idusuarioqasigno: this.idUsuario,
      tareaprincipal: idTareaPrincipal.url
    }


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
    this.tareaEscogidaAbierta = tareaA;

  }

  tareaEscogidaEnTramite(tareaT: any) {

    this.tareaEscogidaTramite = tareaT;
    
  }

  tareaEscogidaenAsignacion(tareaAs: any) {

    this.tareaEscogidaAsignada = tareaAs;

  }

  SubtareaEscogida(tarea: any) {

    this.subtareaEscogida = tarea;

  }

  cerrarModalAsignacion() {
    this.modalSubtarea = false;
    this.descripciontarea = '';
    this.descripcionsubtarea = '';
    this.usuarioseleccionado = {};
    this.mostrarModalAsignacion = false;
    this.mostrarModalRechazarAsignacion = false;
    this.getAllTareas();

  }


  async getAllTareas() {

    const { url, idusuario } = this.usuario;

      // OBTENER LISTA DE TAREAS CON ESTADO PENDIENTE

    this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerVtareasXEstado('Pendiente', 'P'));

    // filtra solo los que AUN NO se VENCEN
        const fechaActual = new Date();

        this.listaTareasPendiente = this.listaTareasPendiente.filter((tarea:any) => {
          // Convierte la fecha de entrega de la tarea a un objeto Date
          const fechaEntrega = new Date(tarea.fechaentrega);

          // Compara la fecha de entrega con la fecha actual
          return fechaEntrega.getTime() > fechaActual.getTime();
        });
      this.informacionEnviada.emit(this.listaTareasPendiente);

        this.loading=false;

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

  }

 async getArchivos(){
    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.tareaEscogidaAbierta.tarea));
 
    } catch (error) {
      this.messageService.add({ severity: 'info', summary: 'No existen archivos', detail: 'No existen archivos adjuntos a este ticket!' });

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);

    } finally {
      this.cargandoArchivos = false;
    }
  }

  async getArchivosTramite(){

      this.cargandoArchivos = true;
      try {
        this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.tareaEscogidaTramite.tarea));
   
      } catch (error) {
        this.messageService.add({ severity: 'info', summary: 'No existen archivos', detail: 'No existen archivos adjuntos a este ticket!' });

        // Aquí puedes manejar el error de acuerdo a tus necesidades.
        console.error('Se produjo un error al obtener archivos:', error);

      } finally {
        this.cargandoArchivos = false;
      }
    }


 async openPDF(data:any){
  data.showspinner  = true; 

      const idArchivo = await firstValueFrom(this.linkservice.getUrl(data.url))


      const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = `${environment.apiUrl}tasks/getarchivos/${idArchivo.idarchivo}/` ;
      }

      data.showspinner  = false; 
  }
/**.
 * Abre modal para registrar actividades en la tabla de subtareas
 */
 async  registrarActividadSubtarea(){
    this.mostrarModalRegistroActividadSubtarea = true;
    this.obtenerActividadesSubtarea();

    const {idestado} = this.subtareaEscogida;

  
    this.estadosubtareaseleccionado = await firstValueFrom(this.linkservice.getUrl(idestado));


  }

  async  registrarActividadTareaPrincipal(){
    this.spinnerLoad3=true;
  
    this.mostrarModalRegistroActividadTareaP = true;
    this.obtenerActividadesTareaPrincipal();

    const {tarea} = this.tareaEscogidaTramite;

  
    const {idestado} = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea));

    this.estadotareaseleccionado = await firstValueFrom(this.linkservice.getUrl(idestado));
    this.spinnerLoad3=false;

  }

  async  obtenerActividadTareaPrincipal(){
    this.spinnerLoad3=true;
  
    this.mostrarModalActividadTareaP = true;
    this.obtenerActividadesTareaPrincipalAsignar();

    const {tarea} = this.tareaEscogidaAbierta;

  
    const {idestado} = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea));

    this.estadotareaseleccionado = await firstValueFrom(this.linkservice.getUrl(idestado));
    this.spinnerLoad3=false;

  }
  /**
   * Cierra modal de registros de actividades
   */


  async guardarActividadSubtarea() {


    
    if(this.tituloactividad !== '' && this.descripcionactividad !==''){
      const nuevaActividad = {
        "tituloseguimientotarea": this.tituloactividad,
        "detalleresolucion": this.descripcionactividad,
        "idtarea": this.subtareaEscogida.url,
        "idusuario": this.idUsuario

    }
  
      
      this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
    
        this.obtenerActividadesSubtarea();
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


  async guardarActividadTareaPrincipal(type:string) {

    const {tarea} = this.tareaEscogidaTramite;
    const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))
    
    if(this.tituloactividad !== '' && this.descripcionactividad !==''){
      const nuevaActividad = {
        "tituloseguimientotarea": this.tituloactividad,
        "detalleresolucion": this.descripcionactividad,
       
        "idtarea": idTareaPrincipal.url,
    }
  

      this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
    
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
  cambiarEstadoWarn(){
    this.messageService.add({ severity: 'warn', summary: 'Resolución de ticket', detail: 'Para cerrar el ticket debe llenar el formulacion de resolución' });
    if(this.estadotareaseleccionado.descripcionestado =='Cerrado - Cancelado' ){
      if( this.tareaEscogidaTramite.descripciontipoticket == "COBROS INDEBIDOS"){
          this.activeIndexForm = 1;
        }
        else{
          this.activeIndexForm = 2;
        }
        
        
      }
  }

  async guardarResolucion() {
    this.spinnerLoad2= true;

    const {tarea} = this.tareaEscogidaTramite;
    const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))

    this.totalmontoresolucion = this.montoresolucion + this.interesmontoresolucion
    
      const nuevaResolucion = {
      "resolution": {
          "numeroresolucion": "three",
          "descripcionresolucion": this.descripcionresolucion,
          "idclasificacionresolucion": this.clasificacionresolucionseleccionada.url,
          "idtarea": idTareaPrincipal.url,
          "idtiporesolucion": this.tiporesolucionseleccionada.url,
          "idusuariosolucion": this.idUsuario
  
      },
      "values": {
          "monto": this.montoresolucion,
          "interesmonto": this.interesmontoresolucion,
          "totalmonto": this.totalmontoresolucion,
          "observacionmonto": this.observacionmonto
      }
      
  }
  
      this.ticketservice.guardarResolucion(nuevaResolucion).subscribe(res => {
        this.cerrarModalVerActividad();
      this.cambiarEstadoTareaP();

        this.obtenerActividadesTareaPrincipal();
        this.activeIndexActivities=0;
        this.messageService.add({ severity: 'success', summary: 'Resolución registrada!', detail: 'La resolución se registró correctamente' });
        this.spinnerLoad2= false;
  
      },
        error => {
          this.cerrarModalVerActividad();
          this.messageService.add({ severity: 'error', summary: 'Resolución no registrada', detail: 'La resolución no se ha registrado. Intente nuevamente' });
          this.spinnerLoad2= false;
  
        }
      )
    }
  
  crearActividadTareaP(){
    this.activeIndexActivities = 1;
  }

  crearActividadSubtarea(){
    this.activeIndexActivities = 1;
  }

myUploader(event:any) {
  
  const file = event.files[0];
  const formData = new FormData();
  
  formData.append('pdf_file', file);
  formData.append('idtarea', "http://localhost:8001/tasks/api/tareas/7/");
  formData.append('nombrearchivo', event.files[0].name);
  formData.append('descripcionarchivo', this.descripcionArchivo);
  formData.append('mimetypearchivo', "application/pdf");

  this.ticketservice.subirPDF(formData).subscribe(resp=>{
    this.messageService.add({ severity: 'success', summary: 'Archivo Subido!', detail: 'El archivo se ha subido correctamente' });
    this.descripcionArchivo='';
    this.myfiles = [];

  },
  error => {
    this.messageService.add({ severity: 'error', summary: 'Upload fallido', detail: error.statusText });

  }
  
  )
}




volverModalVerActividad(){
  this.activeIndexActivities=0;
}




async cambiarEstadoTareaP() {
  const idTareaPrincipal = this.tareaEscogidaTramite.tarea;

  // Verificar si estadotareaseleccionado está definido y tiene la propiedad descripcionestado
  if (this.estadotareaseleccionado && this.estadotareaseleccionado.descripcionestado) {
    const estadoDescripcion = this.estadotareaseleccionado.descripcionestado.toUpperCase();

    const tareaUpdate = {
      idestado: this.estadotareaseleccionado.url
    }

    this.ticketservice.updateTarea(tareaUpdate, idTareaPrincipal).subscribe(
      res => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Tarea actualizada!', 
          detail: 'El estado de la tarea ' + idTareaPrincipal + ' se ha actualizado a estado ' + estadoDescripcion
        });
        this.getAllTareas();
        this.getTareaEstadoColor();
      },
      error => {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Tarea no actualizada', 
          detail: 'El estado de la tarea no se ha actualizado' 
        });
      }
    );
  } else {
    // Manejar el caso en el que estadotareaseleccionado no está definido o no tiene la propiedad descripcionestado
    console.error('La variable estadotareaseleccionado no está definida o no tiene la propiedad descripcionestado');
  }
}


regresarActividades(){
  this.activeIndexForm = 0;
}



async cambiarEstadoSubtarea(){
    
  const idSubtarea = this.subtareaEscogida.idtarea

  const estadoDescripcion = this.estadosubtareaseleccionado.descripcionestado.toUpperCase();

  const tareaUpdate = {
    idestado: this.estadosubtareaseleccionado.url
  }

  this.ticketservice.updateTarea(tareaUpdate, idSubtarea).subscribe(res => {
    this.messageService.add({ severity: 'success', summary: 'Subtarea actualizada!', detail: 'El estado de la subtarea '+idSubtarea+ ' se ha actualizado a estado '+estadoDescripcion});
    this.getAllTareas();
    this.getTareaEstadoColor();

  },
    error => {

      this.messageService.add({ severity: 'error', summary: 'Subtarea no actualizada', detail: 'El estado de la subtarea no se ha actualizado' });

    }
  )
  if(this.estadosubtareaseleccionado.descripcionestado =='Resuelto'){
    this.activeIndexForm = 1;
  }
}
}
