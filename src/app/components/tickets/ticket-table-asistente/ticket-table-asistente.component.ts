import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns'; 
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ticket-table-asistente',
  templateUrl: './ticket-table-asistente.component.html',
  styleUrls: ['./ticket-table-asistente.component.css']
})
export class TicketTableAsistenteComponent implements OnInit {
  @Output() informacionEnviada = new EventEmitter<any>();

  constructor(private ticketservice : TicketService,
    private userservice : UserService,
    private linkservice : LinksService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService) { }

    listaTareasPendiente: any = [];
    usuario: any = {};
    items2: MenuItem[] = [];
    tareaEscogidaAbierta: any = {};
    tareaEscogidaTramite: any = {};
    tareaEscogidaAsignada: any = {};
    tareaEscogidaPendiente: any = {};
    tareaEscogidaEnEspera: any = {};
    modalSubtarea: boolean = false;
    mostrarModalVerTarea: boolean = false;
    mostrarModalAsignacion : boolean  = false ;
    mostrarModalArchivos : boolean  = false ;
    mostrarModalAsignacionPendiente : boolean  = false ;
    descripcionsubtarea: string = '';
    keyFikterLetras: RegExp = /^[A-Za-z\s]+$/;
    keyFilterEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    regexnumber: RegExp = /^[0-9]+$/;
    listaUsuarios: any = [];
    tipoEstado: any = {};
    descripciontarea: string = '';
    loadingData: boolean = false;
    cargandoArchivos: boolean = false;
    listaArchivos: any = [];
    usuarioseleccionado: any = {};
    idUsuario: string = '';
    verTareaDialog: any = {};
    loading: boolean = false;

    async ngOnInit() {
      this.loading=true;

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
            this.verTareaPendiente();
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

          command: () => {
            this.mostrarModalArchivos = true;
            this.getArchivos();
          }
        },

      ];
      await this.getUsuario();
      await this.obtenerUsuario();
      await this.getAllTareas();
      this.obtenerEstado();
      await this.getAllUsers();

  }

  async downloadReporte(){
    
    const newWindow = window.open();
      if (newWindow) {
        newWindow.location.href = `${environment.apiUrl}reports/generate_pdf/${this.tareaEscogidaPendiente.tarea}` ;
      }
  }

  async getArchivos(){

    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(this.ticketservice.obtenerArchivosListXId(this.tareaEscogidaPendiente.tarea));
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
      this.userservice.getEstadosId(2))
  }


  /**
   * 
   */
  async tomarTareaAsignada() {

    this.confirmationService.confirm({
      message: '¿Estás seguro de tomar esta tarea?',
      accept: async () => {

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


   async verTareaPendiente() {
    this.loadingData = true;
    this.mostrarModalVerTarea = true;
    this.verTareaDialog = this.tareaEscogidaPendiente;
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
  }

  cerrarModalAsignacion() {
    this.mostrarModalAsignacion = false;
    this.modalSubtarea = false;

    this.mostrarModalAsignacionPendiente =false;
    this.limpiarCampos();
    this.listaArchivos = [];
    this.getAllTareas();
  }
  cerrarModalVerTarea() {
    this.mostrarModalVerTarea = false;
    this.verTareaDialog = {}
    
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
  
  tareaEscogidaPend(tareaP: any) {

    this.tareaEscogidaPendiente = tareaP;

  }




  async getAllTareas() {

    const { url, idusuario } = this.usuario;

    /** Lista de tareas Pendientes */
    this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerVtareasXidcreador('P',idusuario))
    this.listaTareasPendiente = this.listaTareasPendiente.sort((a:any, b:any) => b.tarea - a.tarea);
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
}
