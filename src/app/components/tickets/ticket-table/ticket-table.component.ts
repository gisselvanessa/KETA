import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { first, firstValueFrom } from 'rxjs';
import { format } from 'date-fns';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.css']
})
export class TicketTableComponent implements OnInit {

  @Output() informacionEnviada = new EventEmitter<any>();
  nextDay: any = Date;

  constructor(private ticketservice: TicketService,
    private userservice: UserService,
    private linkservice: LinksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private settingsservice: SettingsService,

  ) {
    this.nextDay = new Date(this.dateNow);
    this.nextDay.setDate(this.nextDay.getDate() + 1);
  }

  listaTareas: any = [];
  listaTareasEnTramite: any = [];
  listaTareasAbierto: any = [];
  listaTareasAsignado: any = [];
  listaSubtareasEnTramite: any = [];
  listaTareaEstadoColor: any = [];
  activeUpload: number = 0;
  showBotonCambiarFecha: boolean = true;
  usuario: any = {};
  items1: MenuItem[] = [];
  items2: MenuItem[] = [];
  items3: MenuItem[] = [];
  items4: MenuItem[] = [];
  items5: MenuItem[] = [];

  tareaUsuario: any = {};
  tareaEscogidaAbierta: any = {};
  tareaEscogidaAsignada: any = {};
  tareaEscogidaAsignadaAux: any = {};
  tareaEscogidaTramite: any = {};
  tareaEscogidaEnEspera: any = {};
  tareaEscogidaColor: any = {};
  subtareaEscogida: any = {};

  modalSubtarea: boolean = false;
  mostrarModalVerTarea: boolean = false;
  mostrarModalVerTareaEnTramite: boolean = false;

  mostrarModalAsignacion: boolean = false;
  mostrarModalReasignacion: boolean = false;
  mostrarModalRechazarAsignacion: boolean = false;
  descripcionsubtarea: string = '';
  keyFikterLetras: RegExp = /^[A-Za-z\s]+$/;
  keyFilterEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  regexnumber: RegExp = /^[0-9]+$/;
  listaUsuarios: any = [];
  tipoEstado: any = {};
  activeIndexAssign: number = 0;
  mostrarModalAceptarAsignacion: boolean = false;
  date5: any = Date;
  maxDate: any = new Date();
  minDate: any = new Date();
  expandedTareas: any = {};
  filaExpandida: any = null;
  expandedRows: any[] = [];
  loadingData: boolean = false;
  activeIndexActivities: number = 0;

  mostrarModalRegistroActividadSubtarea: boolean = false;
  mostrarModalRegistroActividadTareaP: boolean = false;
  descripcionactividad: string = '';
  tituloactividad: string = '';
  rejectAssignComment: string = '';
  estadosubtareaseleccionado: any = {};
  loading: boolean = false;
  loading2: boolean = false;
  myfiles: any[] = [];

  usuarioseleccionado: any = {};
  idUsuario: string = '';
  user: any = {};
  descripciontarea: string = '';
  verTareaDialog: any = {};
  value: number = 0;
  listaActividadesSubtareas: any = [];
  listaEstados: any = [];
  listaEstados2: any = [];
  listaEstadosTareasP: any = [];
  listaEstadosSubtareas: any = [];
  descripcionArchivo: string = '';
  estadotareaseleccionado: any = {};
  listaActividadesTareaP: any = {};
  listaActividadesTareaPSubtareasaux: any = [];
  listaActividadesTareaPSubtareas: any = [];
  listaTipoResoluciones: any = [];
  listaClasificacionesResoluciones: any = [];
  clasificacionresolucionseleccionada: any = {};
  tiporesolucionseleccionada: any = {};
  mostrarModalArchivos: boolean = false;
  mostrarModalVerTareasSinAsignacion: boolean = false;
  spinnerLoad: boolean = false;
  spinnerLoad2: boolean = false;
  spinnerLoad3: boolean = false;


  descripcionresolucion: string = '';
  observacionmonto: string = '';
  montoresolucion: number = 0;
  interesmontoresolucion: number = 0;
  totalmontoresolucion: number = 0;
  activeIndexForm: number = 0;
  registeractivity: number = 0;
  cargandoArchivos: boolean = false;
  listaArchivos: any = [];
  listaArchivosTareaP: any = [];
  listaArchivosSubtarea: any = [];
  invalidDates: Array<Date> = [];
  dateInicio: any = '';
  dateEntrega: any = '';
  dateNow: any = new Date();
  maxDateValue: any = Date;
  listaHolidays: any = [];
  listaRejectSubtask: any = [];
  subtareaRechazadaEscogida: any = {};
  maxDateValueSecundarias: any = Date;
  dateEntregaSecundaria: any = '';

  async ngOnInit() {
    this.loading = true;
    this.loading2 = true;

    this.maxDateValue = new Date();

    let today = new Date();
    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];


    this.items2 = [
      {
        icon: 'fa-solid fa-gear',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Crear tarea secundaria',
          tooltipPosition: 'top'
        },
        command: () => {
          this.mostrarModalSubtarea();
          this.messageService.add({ severity: 'info', summary: 'Crear subtarea', detail: 'Crear subtarea' });
        }
      },
      {
        icon: "fa-solid fa-eye",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Ver detalles',
          tooltipPosition: 'top'
        },

        command: () => {
          this.verTareaEnTramite();

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
          this.registrarActividadTareaPrincipal();
        }
      },
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Documentos adjuntos',
          tooltipPosition: 'top'
        },
        icon: "pi pi-file-pdf",

        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivosTareaP();
        }
      },

    ];

    this.items3 = [

      {
        icon: "fa-solid fa-eye",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Ver detalles',
          tooltipPosition: 'top'
        },

        command: () => {
          this.verSubtarea();
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
          this.registrarActividadSubtarea(this.subtareaEscogida);
        }
      },
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Documentos adjuntos',
          tooltipPosition: 'top'
        },
        icon: "pi pi-file-pdf",

        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivosSubtareas();
        }
      }
    ];

    this.items4 = [

      {
        icon: "fa-regular fa-hand",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Tomar tarea',
          tooltipPosition: 'top'
        },

        command: () => {
          this.mostrarModalAceptarAsignacion = true;
        }
      },
      {
        icon: 'pi pi-user',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Reasignar ticket',
          tooltipPosition: 'top'
        },

        command: () => {
          this.mostrarModalReasignacion = true;

        }
      },

      {
        icon: "fa-solid fa-eye",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Ver detalles',
          tooltipPosition: 'top'
        },

        // icon: 'pi pi-user',
        command: () => {
          this.verTareaAsignado(this.tareaEscogidaAsignada);
        }
      },
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Documentos adjuntos',
          tooltipPosition: 'top'
        },
        icon: "pi pi-file-pdf",

        // icon: 'pi pi-user',
        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivos();
        }
      },
      // {
      //   icon: 'fa-solid fa-thumbs-down',
      //   tooltipOptions: {
      //     appendTo: 'body',
      //     tooltipLabel: 'Rechazar tarea',
      //     tooltipPosition: 'top'
      //   },
      //   command: () => {
      //     if (this.tareaEscogidaAsignada.indicador === 'P') {

      //       this.mostrarModalRechazarAsignacion = true;
      //     }
      //     else {
      //       this.messageService.add({ severity: 'error', summary: 'Tarea no rechazada', detail: 'La tarea no puede ser rechazada' });

      //     }
      //   }
      // },

    ];

    this.items5 = [

      {


        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Asignar ticket',
          tooltipPosition: 'top'
        },
        icon: 'pi pi-user',
        command: () => {
          this.mostrarModalAsignacion = true;

        }
      },
      {
        icon: "fa-solid fa-eye",
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Ver detalles',
          tooltipPosition: 'top'
        },

        command: () => {
          this.verTareaAsignado(this.subtareaRechazadaEscogida);
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
          this.registrarActividadSubtarea(this.subtareaRechazadaEscogida);
        }
      },



    ];
    this.getInvalidDates();
    await this.getUsuario();
    await this.obtenerUsuario();
    await this.getTareaEstadoColor();
    await this.getAllTareas();

    this.obtenerEstado();



    await this.getAllUsers();
    await this.obtenerAllEstados();
    await this.obtenerTipoResoluciones();
    await this.obtenerClasificacionesResoluciones();
    this.getSubtareasRechazadas()

  }

  getInvalidDates() {
    this.settingsservice.getData().subscribe(
      (data: any) => {
        if (data) {
          this.listaHolidays = data.map((obj: any) => new Date(obj.fecha));
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No hay datos', detail: 'No existen días festivos agregados!' });
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error al obtener datos', detail: 'Solicitud incorrecta' });

        console.error('Error al obtener datos:', error);
      }
    );
  }

  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy HH:mm');
  }
  async downloadReporte() {

    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}reports/generate_pdf/${this.tareaEscogidaTramite.tarea}`;
    }
  }
  sendToUpload() {
    this.activeUpload = 1;
    this.registeractivity = 1;

  }

  closeUpload() {
    this.activeUpload = 0;

  }
  async getArchivos() {

    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.tareaEscogidaAsignada.tareaprincipal));
    } catch (error) {
      this.messageService.add({ severity: 'info', summary: 'No existen archivos', detail: 'No existen archivos adjuntos a este ticket!' });
      this.listaArchivos = [];

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);

    } finally {
      this.cargandoArchivos = false;
    }

  }

  async getArchivosTareaP() {

    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.tareaEscogidaTramite.tarea));
    } catch (error) {
      this.messageService.add({ severity: 'info', summary: 'No existen archivos', detail: 'No existen archivos adjuntos a este ticket!' });
      this.listaArchivos = [];

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);

    } finally {
      this.cargandoArchivos = false;
    }
  }


  async openPDF(data: any) {
    data.showspinner = true;

    const idArchivo = await firstValueFrom(this.linkservice.getUrl(data.url))

    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}tasks/getarchivos/${idArchivo.idarchivo}/`;
    }

    data.showspinner = false;

  }



  async getAllUsers() {



    this.userservice.get_all_vusers().subscribe({
      next: (data: any) => {
        this.listaUsuarios = data;
      }
    })


  }

  async verTareaEnTramite() {
    this.mostrarModalVerTareaEnTramite = true;
    this.verTareaDialog = this.tareaEscogidaTramite;


  }
  async verSubtarea() {
    this.loadingData = true;
    this.mostrarModalVerTareasSinAsignacion = true;
    this.verTareaDialog = this.subtareaEscogida;

    this.loadingData = false;

  }



  async obtenerEstado() {
    this.tipoEstado = await firstValueFrom(
      this.userservice.getEstadosId(3))
  }
  async obtenerTipoResoluciones() {
    this.listaTipoResoluciones = await firstValueFrom(this.ticketservice.getTipoResoluciones());
  }

  async obtenerClasificacionesResoluciones() {
    this.listaClasificacionesResoluciones = await firstValueFrom(this.ticketservice.getClasificacionesResoluciones());

  }

  /**
   * 
   */



  async asignarTicket() {

    const nuevoUsuarioAsignado = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    if (this.subtareaRechazadaEscogida.indicador === 'P') {
      const tareas = {
        descripciontarea: 'Tarea principal: ' + this.descripciontarea,
        indicador: this.subtareaRechazadaEscogida.indicador,
        idestado: this.tipoEstado.url,
        idproblema: this.subtareaRechazadaEscogida.idproblema,
        idusuarioasignado: nuevoUsuarioAsignado.url,
        idusuarioqasigno: this.idUsuario,
      }

      this.ticketservice.updateTarea(tareas, this.subtareaRechazadaEscogida.tarea).subscribe(res => {
        this.cerrarModalAsignacion();
        this.messageService.add({ severity: 'success', summary: 'Tarea asignada!', detail: 'La tarea se asignó exitosamente' });
      },
        error => {
          this.cerrarModalAsignacion();
          this.messageService.add({ severity: 'error', summary: 'Tarea no asignada', detail: 'La tarea no se ha asignado correctamente' });
        }
      )
    }
    else {
      const tareas = {
        descripciontarea: 'Subtarea: ' + this.descripciontarea,
        indicador: this.subtareaRechazadaEscogida.indicador,
        idestado: this.tipoEstado.url,
        idproblema: this.subtareaRechazadaEscogida.idproblema,
        idusuarioasignado: nuevoUsuarioAsignado.url,
        idusuarioqasigno: this.idUsuario,
        fechaentrega: this.dateEntregaSecundaria
      }

      this.ticketservice.updateTarea(tareas, this.subtareaRechazadaEscogida.tarea).subscribe(res => {
        this.cerrarModalAsignacion();
        this.messageService.add({ severity: 'success', summary: 'Subtarea asignada!', detail: 'La subtarea se asignó exitosamente' });
      },
        error => {
          this.cerrarModalAsignacion();
          this.messageService.add({ severity: 'error', summary: 'Subtarea no asignada', detail: 'La subtarea no se ha asignado correctamente' });
        }
      )
    }
  }

  async reasignarTicket() {

    this.spinnerLoad3 = true;

    const tarea = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAsignada.tarea))
    const usuarioUrl = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const tareas = {
      descripciontarea: this.tareaEscogidaAsignada.titulo_tarea,
      indicador: this.tareaEscogidaAsignada.indicador,
      idestado: this.tipoEstado.url,
      idproblema: tarea.idproblema,
      idusuarioasignado: usuarioUrl.url,
      idusuarioqasigno: this.idUsuario,
    }

    this.ticketservice.updateTarea(tareas, this.tareaEscogidaAsignada.tarea).subscribe(res => {
      this.cerrarModalReasignacion();
      this.messageService.add({ severity: 'success', summary: 'Tarea reasignada!', detail: 'La tarea se reasignó exitosamente' });
      this.spinnerLoad3 = true;

    },
      error => {
        this.cerrarModalReasignacion();

        this.messageService.add({ severity: 'error', summary: 'Tarea no reasignada', detail: 'La tarea no se ha reasignado correctamente' });
        this.spinnerLoad3 = true;

      }
    )


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

  async verTareaAsignado(task: any) {
    this.loadingData = true;
    this.mostrarModalVerTareasSinAsignacion = true;
    this.verTareaDialog = task;
    this.loadingData = false;

  }

  /***
   * 
   */

  mostrarModalSubtarea() {
    this.modalSubtarea = true;

  }


  /***
   * 
   */
  cancelarRechazo() {
    this.activeIndexAssign = 0;
    this.mostrarModalAceptarAsignacion = false;

  }
  cerrarModalAsignacion() {
    this.modalSubtarea = false;

    // this.activeIndex = 0;
    this.descripcionsubtarea = '';
    this.usuarioseleccionado = {};
    this.descripciontarea = '';
    this.mostrarModalAsignacion = false;
    this.mostrarModalRechazarAsignacion = false;
    this.dateEntrega = '';
    this.dateEntregaSecundaria = ''

    this.getAllTareas();
    this.getTareaEstadoColor();
    this.getSubtareasRechazadas();

  }
  cerrarModalReasignacion() {
    this.mostrarModalReasignacion = false;
    this.usuarioseleccionado = {};
    this.getAllTareas();


  }

  cerrarModalVerTarea() {
    this.mostrarModalVerTarea = false;
    this.mostrarModalVerTareaEnTramite = false;
    this.verTareaDialog = {}
    this.mostrarModalVerTareasSinAsignacion = false
  }

  aceptarAsignacionRechazada() {
    this.activeIndexAssign = 3;

  }

  async rechazarAsignacion() {

    this.spinnerLoad3 = true;

    if (this.tareaEscogidaAsignada.indicador == 'P') {
      try {
        this.tareaEscogidaAsignadaAux = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAsignada.tarea))
        const idestadopendiente = await firstValueFrom(this.userservice.getEstadosId(2));
        const { url: urlPendiente } = idestadopendiente;
        const { idtarea } = this.tareaEscogidaAsignadaAux;

        this.tareaEscogidaAsignadaAux.idestado = urlPendiente;
        this.tareaEscogidaAsignadaAux.archivo = "";
        this.tareaEscogidaAsignadaAux.idusuarioasignado = null;

        await this.guardarActividadTareaPrincipal('rechazar')
        this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
          next: (data: any) => {

            this.getAllTareas();
            this.mostrarModalRechazarAsignacion = false;
            this.mostrarModalAceptarAsignacion = false;
            this.spinnerLoad3 = false;
            this.messageService.add({ severity: 'success', summary: 'Tarea rechazada', detail: 'La tarea se ha enviado al operador' });
            this.spinnerLoad3 = false;

          },
          error: (err: any) => {
            //console.log('No se pudo actualizar');
            this.messageService.add({ severity: 'error', summary: 'Proceso incompleto', detail: 'La tarea no pudo cambiar de estado' });

            this.mostrarModalRechazarAsignacion = false;
            this.mostrarModalAceptarAsignacion = false;
            this.spinnerLoad3 = false;

          }
        });
      } catch (error) {
        console.error('Error al rechazar la asignación:', error);
        this.spinnerLoad3 = false;
      }
    }
    else if (this.tareaEscogidaAsignada.indicador == 'A') {
      try {
        this.tareaEscogidaAsignadaAux = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAsignada.tarea))

        const idestadoRechazado = await firstValueFrom(this.userservice.getEstadosId(8));

        const { url: urlRechazado } = idestadoRechazado;
        const { idtarea } = this.tareaEscogidaAsignadaAux;


        this.tareaEscogidaAsignadaAux.idestado = urlRechazado;

        this.tareaEscogidaAsignadaAux.archivo = "";
        this.tareaEscogidaAsignadaAux.idusuarioasignado = null;
           
        await this.guardarActividadTareaPrincipal('rechazar')
        this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
          next: (data: any) => {
            this.getAllTareas();
            this.getSubtareasRechazadas();
            // this.guardarActividadTareaPrincipal('rechazar')
            this.messageService.add({ severity: 'success', summary: 'Tarea rechazada', detail: 'La tarea se ha enviado al operador' });
            this.mostrarModalRechazarAsignacion = false;
            this.mostrarModalAceptarAsignacion = false;
            this.spinnerLoad3 = false;

          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Proceso incompleto', detail: 'La tarea no pudo cambiar de estado' });
            this.mostrarModalRechazarAsignacion = false;
            this.mostrarModalAceptarAsignacion = false;
            this.spinnerLoad3 = false;

          }
        });
      } catch (error) {
        console.error('Error al rechazar la asignación:', error);
        this.spinnerLoad3 = false;
      }
    }
    this.mostrarModalRechazarAsignacion = false;

  }


  async crearSubtarea() {

    this.spinnerLoad3 = true;
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
      tareaprincipal: idTareaPrincipal.url,
      subtareatime: this.dateEntrega,
      fechaasignacion: new Date()

    }

    this.ticketservice.crearTarea(subtarea).subscribe(res => {
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
    this.maxDateValue = tareaT.tiemporequerido ? new Date(tareaT.tiemporequerido) : new Date(tareaT.tiempooptimo)

    let contadorSubtareasResuletas = 0;
    if (this.tareaEscogidaTramite.subtasks.length > 0) {
      this.tareaEscogidaTramite.subtasks.forEach((tarea: any) => {
        if (tarea.estado == 'Resuelto') {
          contadorSubtareasResuletas++;
        }

      })
    }

    if (contadorSubtareasResuletas !== this.tareaEscogidaTramite.subtasks.length) {


      for (const estado of this.listaEstadosTareasP) {


        if (estado.descripcionestado === 'Resuelto') {
          estado.disabled = true;
        }
        else {
          estado.disabled = false;
        }

      }
    }
    else {
      for (const estado of this.listaEstadosTareasP) {

        estado.disabled = false;

      }

    }

  }

  tareaEscogidaenAsignacion(tareaAs: any) {

    this.tareaEscogidaAsignada = tareaAs;

    // if (this.tareaEscogidaAsignada.indicador == 'A') {

    //   this.items4[4].disabled = true;

    // } else {
    //   this.items4[4].disabled = false;

    // }

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
          count = Math.floor((count * 100) / (this.tareaEscogidaColor.subtasks.length + 1));
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


  async getAllTareas() {

    const { url, idusuario } = this.usuario;

    this.listaSubtareasEnTramite = await firstValueFrom(this.ticketservice.obtenerVtareasXIndicadorAsignado('A', idusuario))

    this.listaSubtareasEnTramite = this.listaSubtareasEnTramite.filter((tarea: any) => {
      const fechaEntrega = new Date(tarea.fechaentrega);
      const fechaActual = new Date();

      return (
        (tarea.estado === 'En Trámite' ||
          tarea.estado === 'En espera'
          //  tarea.estado === 'Resuelto'
        ) &&
        fechaEntrega.getTime() >= fechaActual.getTime()
      );


    });

    this.loading = false;

    // OBTENER LISTA DE TAREAS CON ESTADO ASIGNADO
    this.listaTareasAsignado = await firstValueFrom(this.ticketservice.obtenerVtareasAsignado(idusuario, 'Asignado'))

    // //Filtrar solo tareas con fechaentrega >= a la fecha actual

    this.listaTareasAsignado = this.listaTareasAsignado.filter((tarea: any) => {

      // Asegurarse de que fechaentrega esté en un formato de fecha válido
      const fechaEntrega = new Date(tarea.fechaentrega);

      // Obtener la fecha actual
      const fechaActual = new Date();

      // Comparar las fechas en el mismo formato (en milisegundos)
      return fechaEntrega.getTime() >= fechaActual.getTime();
    });

    this.loading2 = false;


  }

  async getUsuario() {

    const usuarioPromise = new Promise((resolve, reject) => {
      this.userservice.get_usuario(String(localStorage.getItem('user'))).subscribe(res => {
        resolve(res)
      })
    })
    this.usuario = await usuarioPromise.then(res => res);
  }

  async getTareaEstadoColor() {
    try {
      const { url, idusuario } = this.usuario;

      this.listaTareaEstadoColor = await firstValueFrom(this.ticketservice.obtenerTareaEstadoColor(idusuario));

      this.listaTareaEstadoColor = this.listaTareaEstadoColor.filter((tarea: any) => {
        return tarea.descripcionestado !== 'Resuelto' && tarea.descripcionestado !== 'Asignado' && tarea.descripcionestado !== 'Pendiente';
      });
      this.informacionEnviada.emit(this.listaTareaEstadoColor);
    } catch (error) {
      console.error('Error al obtener la lista de tareas:', error);
      this.messageService.add({ severity: 'info', summary: 'Sin casos en proceso', detail: 'No estas trabajando en ningún caso' });

      // Aquí puedes realizar acciones adicionales si se produce un error, como mostrar un mensaje de error al usuario.
    }


  }

  cerrarModalAceptarAsignacion() {
    this.mostrarModalAceptarAsignacion = false;
    this.modalSubtarea = false;
    this.activeIndexAssign = 0;
    this.getAllTareas();
  }

  volverModalCrearActividad() {
    this.registeractivity = 0;
    this.activeUpload = 0;
  }


  async tomartareaConf() {
    if (this.tareaEscogidaAsignada.indicador === 'P') {
      this.activeIndexAssign = 1;

      this.maxDate = new Date(this.tareaEscogidaAsignada.fecha_extension);
      this.minDate = new Date(this.tareaEscogidaAsignada.fechaentrega);

      // if (this.tareaEscogidaAsignada.prioridad === 'Baja') {
      //   this.maxDate.setDate(this.maxDate.getDate() + 14);
      // }
      // else if (this.tareaEscogidaAsignada.prioridad === 'Media') {
      //   this.maxDate.setDate(this.maxDate.getDate() + 8);
      // }
      // else if (this.tareaEscogidaAsignada.prioridad === 'Alta') {
      //   this.maxDate.setDate(this.maxDate.getDate() + 5);
      // }
    }
    else {
      this.activeIndexAssign = 2;

    }
  }


  nuevaFechaActiva() {
    this.showBotonCambiarFecha = false;
  }

  async tomarTareaAsignadaCambioFecha() {
    this.spinnerLoad3 = true;

    const tareaColor = {
      idtarea: "",
      tiemporequerido: null,
    };

    this.tareaEscogidaAsignadaAux = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAsignada.tarea))
    const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));
    const { url: urlTramite } = idestadotramite;
    const { idtarea } = this.tareaEscogidaAsignadaAux;

    this.tareaEscogidaAsignadaAux.idestado = urlTramite;

    this.tareaEscogidaAsignadaAux.archivo = "";

    tareaColor.idtarea = this.tareaEscogidaAsignadaAux.url;
    this.date5.setHours(11);
    this.date5.setMinutes(59);
    this.date5.setSeconds(59);
    this.date5.setMilliseconds(123);

    tareaColor.tiemporequerido = this.date5;

    if (this.tareaEscogidaAsignadaAux.indicador === 'P') {

      this.ticketservice.enviarTareaColor(tareaColor).subscribe({

        next: (data: any) => {
          this.tareaEscogidaAsignadaAux.fechaentrega = this.date5;
          this.tareaEscogidaAsignadaAux.idestado = urlTramite;

          this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
            next: (data: any) => {
              this.getAllTareas();
              this.getTareaEstadoColor();
              this.mostrarModalAceptarAsignacion = false;
              this.date5 = "";
              this.spinnerLoad3 = false;
              this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });

            },
            error: (err: any) => {
              //console.log('No se pudo actualizar');
              this.mostrarModalAceptarAsignacion = false;
              this.spinnerLoad3 = false;
              this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });
              this.date5 = "";



            }
          })

        },
        error: (err: any) => {
          this.mostrarModalAceptarAsignacion = false;
          this.spinnerLoad3 = false;

          this.date5 = "";

        }
      })

    }
    else {

      this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
        next: (data: any) => {
          this.getAllTareas();
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
          this.date5 = "";
          this.spinnerLoad3 = false;

        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });

          this.spinnerLoad3 = false;
          this.date5 = "";
        }
      })
    }
  }


  async tomarTareaAbiertaCambioFecha() {
    //console.log('Tomar tarea abierta');

    const tareaColor = {
      idtarea: "",
      tiemporequerido: null,
    };


    const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));

    const { url: urlTramite } = idestadotramite;
    const { idtarea } = this.tareaEscogidaAbierta;
    this.tareaEscogidaAbierta.idestado = urlTramite;

    this.tareaEscogidaAbierta.archivo = "";

    tareaColor.idtarea = this.tareaEscogidaAbierta.url;

    tareaColor.tiemporequerido = this.date5;

    this.ticketservice.enviarTareaColor(tareaColor).subscribe({

      next: (data: any) => {
        this.tareaEscogidaAbierta.fechaentrega = this.date5;
        this.tareaEscogidaAbierta.idestado = urlTramite;

        this.ticketservice.updateTarea(this.tareaEscogidaAbierta, idtarea).subscribe({
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
        this.mostrarModalAceptarAsignacion = false;
      }
    })




  }

  async tomarTareaAsignada() {
    this.spinnerLoad3 = true;

    const tareaColor = {
      idtarea: "",
      tiemporequerido: null,
    };

    this.tareaEscogidaAsignadaAux = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaAsignada.tarea))

    const idestadotramite = await firstValueFrom(this.userservice.getEstadosId(4));

    const { url: urlTramite } = idestadotramite;
    const { idtarea } = this.tareaEscogidaAsignadaAux;

    this.tareaEscogidaAsignadaAux.idestado = urlTramite;

    this.tareaEscogidaAsignadaAux.archivo = "";

    tareaColor.idtarea = this.tareaEscogidaAsignadaAux.url;

    if (this.tareaEscogidaAsignadaAux.indicador === 'P') {

      this.ticketservice.enviarTareaColor(tareaColor).subscribe({

        next: (data: any) => {

          this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
            next: (data: any) => {
              this.getAllTareas();
              this.getTareaEstadoColor();
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
              this.date5 = "";
              this.spinnerLoad3 = false;


            },
            error: (err: any) => {
              //console.log('No se pudo actualizar');
              this.mostrarModalAceptarAsignacion = false;
              this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });
              this.spinnerLoad3 = false;
              this.date5 = "";

            }
          })


        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.spinnerLoad3 = false;
          this.date5 = "";


        }
      })
    }
    else if (this.tareaEscogidaAsignadaAux.indicador === 'A') {
      this.spinnerLoad3 = false;

      this.ticketservice.updateTarea(this.tareaEscogidaAsignadaAux, idtarea).subscribe({
        next: (data: any) => {
          this.getAllTareas();
          this.getTareaEstadoColor();
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'success', summary: 'Tarea escogida!', detail: 'Empieza a trabajar en tu ticket. Tic-tac' });
          this.date5 = "";
          this.spinnerLoad3 = false;


        },
        error: (err: any) => {
          //console.log('No se pudo actualizar');
          this.mostrarModalAceptarAsignacion = false;
          this.messageService.add({ severity: 'error', summary: 'Tarea no escogida', detail: 'La tarea no se ha asignado correctamente' });
          this.spinnerLoad3 = false;
          this.date5 = "";

        }
      })
    }

  }


  SubtareaEscogida(tarea: any) {

    this.subtareaEscogida = tarea;

  }
  SubtareaRechazadaEscogida(tarea: any) {
    this.subtareaRechazadaEscogida = tarea;
    this.maxDateValueSecundarias = new Date(tarea.fecha_entrega)

  }
  cerrarModalVerActividad() {

    this.descripcionactividad = '';
    this.tituloactividad = '';
    this.activeIndexActivities = 0;
    this.mostrarModalRegistroActividadSubtarea = false;
    this.mostrarModalRegistroActividadTareaP = false;
    this.listaActividadesSubtareas = [];
    this.listaActividadesTareaP = {};


    //RESOLUCION

    this.descripcionresolucion = '';
    this.montoresolucion = 0;
    this.clasificacionresolucionseleccionada = {};
    this.interesmontoresolucion = 0;
    this.tiporesolucionseleccionada = {};
    this.totalmontoresolucion = 0;
    this.observacionmonto = '';
    this.activeIndexForm = 0;
    this.activeUpload = 0;
    this.registeractivity = 0;
  }

  volverModalVerActividad() {
    this.activeIndexActivities = 0;
  }
  crearActividadSubtarea() {
    this.activeIndexActivities = 1;
  }

  async guardarActividadSubtarea() {
    this.spinnerLoad2 = true;

    const idTareaUrl = await firstValueFrom(this.ticketservice.obtenerTareaId(this.subtareaEscogida.tarea))


    if (this.tituloactividad !== '' && this.descripcionactividad !== '') {
      const nuevaActividad = {
        "tituloseguimientotarea": this.tituloactividad,
        "detalleresolucion": this.descripcionactividad,
        "idtarea": idTareaUrl.url,
        "idusuario": this.idUsuario

      }


      this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
        this.obtenerActividadesSubtarea(this.subtareaEscogida);
        this.activeIndexActivities = 0;
        this.messageService.add({ severity: 'success', summary: 'Actividad registrada!', detail: 'La actividad se registró correctamente' });
        this.tituloactividad = '';
        this.descripcionactividad = '';
        this.spinnerLoad2 = false;

      },
        error => {
          this.cerrarModalVerActividad();
          this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'La actividad no se ha registrado. Intente nuevamente' });
          this.spinnerLoad2 = false;

        }
      )
    }
    else {
      this.messageService.add({
        severity: 'error', summary: 'Actividad no registrada', detail: 'Hay campos vacíos.',
      });
      this.spinnerLoad2 = false;
    }
    this.activeUpload = 0;

  }


  async obtenerActividadesSubtarea(task: any) {
    try {
      this.listaActividadesSubtareas = await firstValueFrom(this.ticketservice.getActividadesxId(task.tarea));
    } catch (error) {
      console.error('Error al obtener las actividades de la subtarea:', error);
      this.messageService.add({ severity: 'info', summary: 'No existen actividades', detail: 'No existen actividades para esta subtarea' });

    }
  }


  crearActividadTareaP() {
    this.activeIndexActivities = 1;

  }


  async obtenerAllEstados() {
    this.listaEstados = await firstValueFrom(this.userservice.getEstados());
    this.listaEstados2 = await firstValueFrom(this.userservice.getEstados());
    this.listaEstadosTareasP = this.listaEstados.filter((estado: any) => {
      return estado.idestado > 3 && estado.idestado < 7;
    })

    this.listaEstadosSubtareas = this.listaEstados2.filter((estado: any) => {
      return estado.idestado > 3 && estado.idestado < 7;
    })

  }


  async guardarActividadTareaPrincipal(type: string) {

    this.spinnerLoad2 = true;

    if (type === 'crear') {
      const { tarea } = this.tareaEscogidaTramite;
      const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))
      if (this.tituloactividad !== '' && this.descripcionactividad !== '') {
        const nuevaActividad = {
          "tituloseguimientotarea": this.tituloactividad,
          "detalleresolucion": this.descripcionactividad,
          // "archivo": "",
          "idtarea": idTareaPrincipal.url,
          "idusuario": this.idUsuario
        }

        this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
          this.obtenerActividadesTareaPrincipal();
          this.activeIndexActivities = 0;
          this.messageService.add({ severity: 'success', summary: 'Actividad registrada!', detail: 'La actividad se registró correctamente' });
          this.tituloactividad = '';
          this.descripcionactividad = '';
          this.spinnerLoad2 = false;

        },
          error => {
            this.cerrarModalVerActividad();
            this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'La actividad no se ha registrado. Intente nuevamente' });
            this.spinnerLoad2 = false;

          }
        )
      }
      else {
        this.messageService.add({
          severity: 'error', summary: 'Actividad no registrada', detail: 'Hay campos vacíos.',
        });
        this.spinnerLoad2 = false;

      }
    }
    else if (type === 'rechazar') {
      const { tarea } = this.tareaEscogidaAsignada;
      const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))
      const nuevaActividad = {
        "tituloseguimientotarea": 'Tarea rechazada',
        "detalleresolucion": this.rejectAssignComment,
        // "archivo": "",
        "idtarea": idTareaPrincipal.url,
        "idusuario": this.idUsuario
      }

      this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
        // this.obtenerActividadesTareaPrincipal();
        this.activeIndexActivities = 0;
        this.messageService.add({ severity: 'success', summary: 'Actividad registrada!', detail: 'La actividad se registró correctamente' });
        this.tituloactividad = '';
        this.descripcionactividad = '';
        this.rejectAssignComment = '';
        this.spinnerLoad2 = false;


      },
        error => {
          this.cerrarModalVerActividad();
          this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'La actividad no se ha registrado. Intente nuevamente' });
          this.spinnerLoad2 = false;

        }
      )
    }



    this.activeUpload = 0;
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

  async guardarResolucion() {
    const { tarea } = this.tareaEscogidaTramite;
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
      this.obtenerActividadesTareaPrincipal();
      this.activeIndexActivities = 0;
      this.messageService.add({ severity: 'success', summary: 'Resolución registrada!', detail: 'La resolución se registró correctamente' });

    },
      error => {
        this.cerrarModalVerActividad();
        this.messageService.add({ severity: 'error', summary: 'Resolución no registrada', detail: 'La resolución no se ha registrado. Intente nuevamente' });

      }
    )
  }


  regresarActividades() {
    this.activeIndexForm = 0;
  }


  async myUploaderTareaP(event: any) {
    this.spinnerLoad2 = true;

    const file = event.files[0];

    const formData = new FormData();
    const idTareaObtenido = await firstValueFrom(this.ticketservice.obtenerTareaId(this.tareaEscogidaTramite.tarea))
    const { url } = idTareaObtenido;

    formData.append('pdf_file', file);
    formData.append('idtarea', url);
    formData.append('nombrearchivo', event.files[0].name);
    formData.append('descripcionarchivo', 'Actividad - ' + this.descripcionArchivo);
    formData.append('mimetypearchivo', "application/pdf");

    this.ticketservice.subirPDF(formData).subscribe(resp => {

      this.messageService.add({ severity: 'success', summary: 'Archivo Subido!', detail: 'El archivo se ha subido correctamente' });
      this.descripcionArchivo = '';
      this.spinnerLoad2 = false;
      this.myfiles = [];

    },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Upload fallido', detail: error.error.non_field_errors });
        this.spinnerLoad2 = false;
      }
    )
  }

  async myUploaderTareaS(event: any) {
    this.spinnerLoad2 = true;
    const file = event.files[0];
    const formData = new FormData();
    const tarea = await firstValueFrom(this.ticketservice.obtenerTareaId(this.subtareaEscogida.tarea))

    formData.append('pdf_file', file);
    formData.append('idtarea', tarea.tareaprincipal);
    formData.append('idsubtarea', tarea.url);
    formData.append('nombrearchivo', event.files[0].name);
    formData.append('descripcionarchivo', 'Actividad tarea secundaria - ' + this.descripcionArchivo);
    formData.append('mimetypearchivo', "application/pdf");

    this.ticketservice.subirPDF(formData).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Archivo Subido!', detail: 'El archivo se ha subido correctamente' });
      this.descripcionArchivo = '';
      this.spinnerLoad2 = false;
      this.myfiles = [];


    },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Upload fallido', detail: error.statusText });
        this.spinnerLoad2 = false;

      }

    )
  }
  /**
   * Abre modal para registrar actividades en la tabla de subtareas
   */
  async registrarActividadSubtarea(task: any) {
    this.spinnerLoad2 = true;
    this.mostrarModalRegistroActividadSubtarea = true;
    this.obtenerActividadesSubtarea(task);
    const { estado } = this.subtareaEscogida;

    const estadoTramite = await firstValueFrom(this.userservice.getEstadosId(4));
    const estadoEspera = await firstValueFrom(this.userservice.getEstadosId(5));
    const estadoResuelto = await firstValueFrom(this.userservice.getEstadosId(6));

    if (estado == estadoTramite.descripcionestado) {
      this.estadosubtareaseleccionado = estadoTramite
    }
    else if (estado == estadoEspera.descripcionestado) {
      this.estadosubtareaseleccionado = estadoEspera
    }
    else if (estado == estadoResuelto.descripcionestado) {
      this.estadosubtareaseleccionado = estadoResuelto
    }

    this.spinnerLoad2 = false;

  }

  async registrarActividadTareaPrincipal() {
    this.spinnerLoad2 = true;
    this.mostrarModalRegistroActividadTareaP = true;
    this.obtenerActividadesTareaPrincipal();

    const { tarea } = this.tareaEscogidaTramite;
    const { idestado } = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea));

    this.estadotareaseleccionado = await firstValueFrom(this.linkservice.getUrl(idestado));
    this.spinnerLoad2 = false;

  }



  async cambiarEstadoSubtarea() {
    this.spinnerLoad2 = true;

    const idSubtarea = this.subtareaEscogida.tarea

    const estadoDescripcion = this.estadosubtareaseleccionado.descripcionestado.toUpperCase();

    const tareaUpdate = {
      idestado: this.estadosubtareaseleccionado.url
    }

    this.ticketservice.updateTarea(tareaUpdate, idSubtarea).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Subtarea actualizada!', detail: 'El estado de la subtarea ' + idSubtarea + ' se ha actualizado a estado ' + estadoDescripcion });
      this.getAllTareas();
      this.getTareaEstadoColor();
      this.spinnerLoad2 = false;
    },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Subtarea no actualizada', detail: 'El estado de la subtarea no se ha actualizado' });
        this.spinnerLoad2 = false;

      }
    )

  }


  async getArchivosSubtareas() {


    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.subtareaEscogida.tareaprincipal));
    } catch (error) {
      this.messageService.add({ severity: 'info', summary: 'No existen archivos', detail: 'No existen archivos adjuntos a este ticket!' });
      this.listaArchivos = [];

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);

    } finally {
      this.cargandoArchivos = false;
    }
  }


  async cambiarEstadoTareaP() {

    this.spinnerLoad2 = true;

    const idTareaPrincipal = this.tareaEscogidaTramite.tarea
    const estadoDescripcion = this.estadotareaseleccionado.descripcionestado.toUpperCase();
    const tareaUpdate = {
      idestado: this.estadotareaseleccionado.url
    }

    this.ticketservice.updateTarea(tareaUpdate, idTareaPrincipal).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Tarea actualizada!', detail: 'El estado de la tarea ' + idTareaPrincipal + ' se ha actualizado a estado ' + estadoDescripcion });
      this.getAllTareas();
      this.getTareaEstadoColor();
      this.spinnerLoad2 = false;

    },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Tarea no actualizada', detail: 'El estado de la tarea no se ha actualizado' });
        this.spinnerLoad2 = false;

      }
    )


  }

  getSubtareasRechazadas() {
    const { url, idusuario } = this.usuario;

    this.ticketservice.getrejectedTasksByUser(idusuario).subscribe(
      (data: any) => {
        if (data) {
          this.listaRejectSubtask = data
        } else {
          this.messageService.add({ severity: 'warn', summary: 'No hay datos', detail: 'No existen subtareas rechazadas' });
        }
      },
      (error) => {

        console.error('Error al obtener datos:', error);
      }
    );
  }
}
