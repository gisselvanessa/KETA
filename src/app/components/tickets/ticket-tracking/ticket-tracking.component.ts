import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-tracking',
  templateUrl: './ticket-tracking.component.html',
  styleUrls: ['./ticket-tracking.component.css']
})
export class TicketTrackingComponent implements OnInit {

  @Output() informacionEnviada = new EventEmitter<any>();

  constructor(private ticketservice: TicketService,
    private userservice: UserService,
    private linkservice: LinksService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  activeUpload: number = 0;
  listaTareaEstadoColor: any = [];
  listaAllTareasAsignadas: any = [];
  listaTareas: any = [];
  listaTareasEnTramite: any = [];
  listaTareasAbierto: any = [];
  listaTareasAsignado: any = [];
  listaTareasPendiente: any = [];
  usuario: any = {};
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  items2: MenuItem[] = [];
  items3: MenuItem[] = [];
  dash: MenuItem = {};
  spinnerLoad2: boolean = false;
  tareaUsuario: any = {};
  tareaEscogidaAbierta: any = {};
  tareaEscogidaTramite: any = {};
  tareaEscogidaAsignada: any = {};
  tareaEscogidaPendiente: any = {};
  tareaEscogidaEnEspera: any = {};
  modalSubtarea: boolean = false;
  mostrarModalVerTarea: boolean = false;
  mostrarModalAsignacion: boolean = false;
  mostrarModalAsignacionPendiente: boolean = false;
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
  estadotareaseleccionado: any = {};

  descripcionactividad: string = '';
  tituloactividad: string = '';
  descripcionArchivo: string = '';
  activeIndexAssign: number = 0;
  activeIndexActivities: number = 0;
  activeIndexForm: number = 0;

  descripcionresolucion: string = '';
  observacionmonto: string = '';
  montoresolucion: number = 0;
  interesmontoresolucion: number = 0;
  totalmontoresolucion: number = 0;

  mostrarModalRegistroActividadSubtarea: boolean = false;
  mostrarModalVerTareasSinAsignacion: boolean = false;
  clasificacionresolucionseleccionada: any = {};
  tiporesolucionseleccionada: any = {};
  listaEstadosTareasP: any = [];

  listaTipoResoluciones: any = [];
  listaClasificacionesResoluciones: any = [];
  listaEstados: any = [];
  listaEstadosSubtareas: any = [];
  mostrarModalArchivos: boolean = false;


  usuarioseleccionado: any = {};
  idUsuario: string = '';
  verTareaDialog: any = {};
  listaArchivos: any = [];
  cargandoArchivos: boolean = false;
  loading: boolean = false;
  myfiles: any[] = [];



  async ngOnInit() {
    this.items = [

      { label: 'Tickets' },
      { label: 'Casos en proceso' },

    ];
    this.loading = true;

    await this.getUsuario();
    await this.obtenerUsuario();
    this.obtenerEstado();


    this.dash = { icon: 'pi pi-ticket', routerLink: '/home-ticket/ticket-tracking' };

    this.items3 = [

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
          this.getArchivos();
        }
      },

    ];

    await this.getAllUsers();
    await this.getTareaEstadoColor();

    await this.obtenerAllEstados();
    await this.obtenerTipoResoluciones();
    await this.obtenerClasificacionesResoluciones();
    this.loading = false;

  }
  async obtenerTipoResoluciones() {
    this.listaTipoResoluciones = await firstValueFrom(this.ticketservice.getTipoResoluciones());
  }
  async downloadReporte() {

    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}reports/generate_pdf/${this.tareaEscogidaTramite.tarea}`;
    }
  }

  async getArchivos() {

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


  async openPDF(data: any) {
    data.showspinner = true;
    const idArchivo = await firstValueFrom(this.linkservice.getUrl(data.url))
    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}tasks/getarchivos/${idArchivo.idarchivo}/`;
    }

    data.showspinner = false;
  }



  async obtenerClasificacionesResoluciones() {
    this.listaClasificacionesResoluciones = await firstValueFrom(this.ticketservice.getClasificacionesResoluciones());
  }

  async verTareaEnTramite() {
    this.mostrarModalVerTareasSinAsignacion = true;
    this.verTareaDialog = this.tareaEscogidaTramite;

  }


  async obtenerAllEstados() {
    this.listaEstados = await firstValueFrom(this.userservice.getEstados());

    this.listaEstadosTareasP = this.listaEstados.filter((estado: any) => {
      return estado.idestado === 4 || estado.idestado === 5 || estado.idestado === 7;
    })

    this.listaEstadosSubtareas = this.listaEstados.filter((estado: any) => {
      return estado.idestado > 3 && estado.idestado < 7;
    })

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

  async getTareaEstadoColor() {
    try {
      const { url, idusuario } = this.usuario;

      this.listaTareaEstadoColor = await firstValueFrom(this.ticketservice.getAllTareasEstadoColor());

      this.listaTareaEstadoColor = this.listaTareaEstadoColor.filter((tarea: any) => {
        return tarea.descripcionestado !== 'Resuelto';
      });
      this.informacionEnviada.emit(this.listaTareaEstadoColor);
    } catch (error) {
      console.error('Error al obtener la lista de tareas:', error);
      this.messageService.add({ severity: 'info', summary: 'Sin casos en proceso', detail: 'No estas trabajando en ningún caso' });

    }
  }

  async obtenerActividadesTareaPrincipal() {
    try {

      this.listaActividadesTareaP = await firstValueFrom(this.ticketservice.getActividadesxId(this.tareaEscogidaTramite.tarea));

      this.listaActividadesTareaPSubtareas = this.listaActividadesTareaP.subtasks;

    } catch (error) {
      console.error( error);
      this.messageService.add({ severity: 'info', summary: 'No existen actividades', detail: 'No existen actividades para este ticket' });
    }
  }


  async asignarTicket() {

    const usuarioUrl = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const tareas = {
      descripciontarea: this.descripciontarea,
      indicador: 'P',
      idestado: this.tipoEstado.url,
      idproblema: this.tareaEscogidaAbierta.idproblema,
      idusuarioasignado: usuarioUrl.url,
      idusuarioqasigno: this.idUsuario,
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

  async asignarTicketPendiente() {

    const usuarioUrl = await firstValueFrom(this.userservice.get_usuario(this.usuarioseleccionado.email))

    const tareas = {
      descripciontarea: this.descripciontarea,
      indicador: 'P',
      idestado: this.tipoEstado.url,
      idproblema: this.tareaEscogidaPendiente.idproblema,
      idusuarioasignado: usuarioUrl.url,
      idusuarioqasigno: this.idUsuario,
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
  formatTimestamp(timestamp: any): string {
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



  sendToUpload() {
    this.activeUpload = 1;
  }

  closeUpload() {
    this.activeUpload = 0;

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


  mostrarModalSubtarea() {
    this.modalSubtarea = true;

  }
  limpiarCampos() {
    this.descripciontarea = '';
    this.usuarioseleccionado = {};


  }

  /***
  * 
  */

  cerrarModalSubtarea() {
    this.modalSubtarea = false;

  }

  cerrarModalAsignacion() {
    this.mostrarModalAsignacion = false;
    this.modalSubtarea = false;

    this.mostrarModalAsignacionPendiente = false;
    this.limpiarCampos();
    this.getAllTareas();
  }
  cerrarModalVerTarea() {
    this.mostrarModalVerTarea = false;
    this.mostrarModalVerTareaEnTramite = false;
    this.verTareaDialog = {}
    this.mostrarModalVerTareasSinAsignacion = false
  }




  crearSubtarea() {

    const subtarea = {
      descripciontarea: this.descripcionsubtarea,
      indicador: 'A',
      fkidtarea: this.tareaEscogidaTramite.url,
      idestado: this.tipoEstado.url,
      idusuarioasignado: this.usuarioseleccionado.url,
      idusuarioqasigno: this.idUsuario,
      tareaprincipal: this.tareaEscogidaTramite.url
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


  tareaEscogidaPend(tareaP: any) {

    this.tareaEscogidaPendiente = tareaP;

  }




  async getAllTareas() {

    const { url, idusuario } = this.usuario;

    this.listaTareasEnTramite = await firstValueFrom(this.ticketservice.obtenerFiltroTarea(idusuario, 4))

    this.listaTareasEnTramite = await Promise.all(this.listaTareasEnTramite.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
      return tarea;

    }));
    // })
    this.listaTareasAbierto = await firstValueFrom(this.ticketservice.obtenerFiltroTarea('', 1))

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
      return tarea;
    }));

    this.informacionEnviada.emit(this.listaTareasEnTramite);

    this.listaTareasAsignado = await firstValueFrom(this.ticketservice.obtenerFiltroTarea(idusuario, 3))

    this.listaTareasAsignado = await Promise.all(this.listaTareasAsignado.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
      return tarea;
    }));


    /** Lista de tareas Pendientes */
    this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerFiltroTarea('', 2))

    this.listaTareasPendiente = await Promise.all(this.listaTareasPendiente.map(async (tarea: any) => {
      const { idprioridad } = tarea;
      const idprioridadPromise = this.linkservice.getUrl(idprioridad).toPromise();
      const prioridad: any = await idprioridadPromise;
      const { descripcionprioridad } = prioridad;
      tarea.descripcionprioridad = descripcionprioridad;
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



  SubtareaEscogida(tarea: any) {
    this.subtareaEscogida = tarea;

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
  /**
  * 
  * @param event crea un formData para registrarlo en la base
  */
  myUploader(event: any) {

    const file = event.files[0];

    const formData = new FormData();

    formData.append('pdf_file', file);
    formData.append('idtarea', "http://localhost:8001/tasks/api/tareas/7/");
    formData.append('nombrearchivo', event.files[0].name);
    formData.append('descripcionarchivo', this.descripcionArchivo);
    formData.append('mimetypearchivo', "application/pdf");

    this.ticketservice.subirPDF(formData).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Archivo Subido!', detail: 'El archivo se ha subido correctamente' });
      this.descripcionArchivo = ''
      this.myfiles = [];

    },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Upload fallido', detail: error.statusText });

      }

    )
  }


  volverModalVerActividad() {
    this.activeIndexActivities = 0;
  }

  async guardarActividadTareaPrincipal(type:string) {
    const { tarea } = this.tareaEscogidaTramite;
    const idTareaPrincipal = await firstValueFrom(this.ticketservice.obtenerTareaId(tarea))

    if (this.tituloactividad !== '' && this.descripcionactividad !== '') {
      const nuevaActividad = {
        "tituloseguimientotarea": this.tituloactividad,
        "detalleresolucion": this.descripcionactividad,
        "idtarea": idTareaPrincipal.url,
        "idusuario": this.idUsuario

      }

      this.ticketservice.crearActividad(nuevaActividad).subscribe(res => {
        this.obtenerActividadesTareaPrincipal();
        this.activeIndexActivities = 0;
        this.messageService.add({ severity: 'success', summary: 'Actividad registrada!', detail: 'La actividad se registró correctamente' });

      },
        error => {
          this.cerrarModalVerActividad();
          this.messageService.add({ severity: 'error', summary: 'Actividad no registrada', detail: 'La actividad no se ha registrado. Intente nuevamente' });

        }
      )
    }
    else {
      this.messageService.add({
        severity: 'error', summary: 'Actividad no registrada', detail: 'Hay campos vacíos.',
      });
    }



  }

  async cambiarEstadoTareaP() {

    const idTareaPrincipal = this.tareaEscogidaTramite.tarea
    const estadoDescripcion = this.estadotareaseleccionado.descripcionestado.toUpperCase();


    const tareaUpdate = {
      idestado: this.estadotareaseleccionado.url
    }

    this.ticketservice.updateTarea(tareaUpdate, idTareaPrincipal).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Tarea actualizada!', detail: 'El estado de la tarea ' + idTareaPrincipal + ' se ha actualizado a estado ' + estadoDescripcion });
      this.getAllTareas();
      this.getTareaEstadoColor();
    },
      error => {

        this.messageService.add({ severity: 'error', summary: 'Tarea no actualizada', detail: 'El estado de la tarea no se ha actualizado' });

      }
    )
    if (this.estadotareaseleccionado.descripcionestado == 'Cerrado - Cancelado') {
      this.activeIndexForm = 1;
    }

  }


  crearActividadTareaP() {
    this.activeIndexActivities = 1;

  }

}
