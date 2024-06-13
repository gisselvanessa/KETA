/**
 * Componente para el panel de control de tareas y visualización de detalles del rol tecnico
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { LinksService } from 'src/app/services/links.service';
import { TicketService } from 'src/app/services/ticket.service';
import { format } from 'date-fns'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[]  = [];

  listaTareas : any = [];

  usuario : any = {};

  dash: MenuItem = {}; 

  responsiveOptions : any =[];

  listaTareasEnTramite : any = [];

  listaTareasAbierto : any = [];

  listaTareaEstadoColor : any = [];

  tareaUsuario : any = {};

  mostrarModalAsignacion : boolean = false;

  tareaDialog :any = {};


  constructor(

    private ticketservice: TicketService, 

    private linkservice: LinksService,

    private messageService: MessageService

    ) { }



  /**
   * Se ejecuta cuando se inicializa el componente.
   * Inicializa las opciones responsivas y carga los elementos del menú.
   */
  async ngOnInit() {

    this.responsiveOptions = [

      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },

      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },

      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }

  ];
    this.items = [
     
      {label:'Dashboard'},

    ];

    this.dash = {icon: 'pi pi-th-large', routerLink: '/home-ticket/dashboard/ticket-table'};

  }

  


  /**
   * Recibe información del componente hijo y la almacena en la lista de tareas en trámite.
   * @param informacion Información recibida del componente hijo.
   */
  recibirInformacion(informacion: any) {
   
    this.listaTareasEnTramite = informacion;

    this.listaTareaEstadoColor = this.listaTareasEnTramite;
    
  }




  /**
   * Obtiene la lista de tareas con un estado de color.
   */
  async getTareaEstadoColor() {

    try {

      const { url, idusuario } = this.usuario;
    
      this.listaTareaEstadoColor = await firstValueFrom(this.ticketservice.obtenerTareaEstadoColor(idusuario));
    
      this.listaTareaEstadoColor = this.listaTareaEstadoColor.filter((tarea: any) => {
        
        return tarea.descripcionestado !== 'Resuelto';

      });


    } catch (error) {

      console.error('Error al obtener la lista de tareas:', error);

      this.messageService.add({ severity: 'info', summary: 'Sin casos en proceso', detail: 'No estas trabajando en ningún caso' });
      
    }
  }





  /**
   * Abre un modal para mostrar los detalles de una tarea.
   * @param tarea Tarea de la que se mostrarán los detalles.
   */
  async abrirModalDetalleTarea(tarea :any){

    this.mostrarModalAsignacion=true;

    this.tareaDialog = tarea;


    const {idproblema} = this.tareaDialog;

    const problemaDialog = await firstValueFrom(this.linkservice.getUrl(idproblema));
    

    const { numeroticket, idsucursal, idtipoticket, idtipocomentario,descripcionasunto, idpersona } = problemaDialog;

    this.tareaDialog.numeroticket = numeroticket;

    const agenciaDialog = await firstValueFrom(this.linkservice.getUrl(idsucursal));

    const tipoReclamoDialog = await firstValueFrom(this.linkservice.getUrl(idtipoticket));

    const tipoComentarioDialog = idtipocomentario == null ? '' : await firstValueFrom(this.linkservice.getUrl(idtipocomentario));

    const personaDialog = await firstValueFrom(this.linkservice.getUrl(idpersona));


    this.tareaDialog.nombresucursal = agenciaDialog.nombresucursal;

    this.tareaDialog.descripcionasunto = descripcionasunto;

    this.tareaDialog.tipoReclamo = tipoReclamoDialog.descripciontipoticket;

    this.tareaDialog.tipoComentario = tipoComentarioDialog.descripciontipocomentario;

    this.tareaDialog.persona = personaDialog.nombre;
    
  }




  /**
   * Cierra el modal de detalles de tarea.
   */
  cerrarModalDetalleTarea(){

    this.mostrarModalAsignacion=false;

    // this.limpiarCampos();

    // this.limpiarCamposReclamos();

    // this.activeIndex=0;

    // this.descripciontarea='';

    // this.usuarioseleccionado = {};

  }




  /**
   * Formatea una marca de tiempo en una cadena de fecha legible.
   * @param timestamp Marca de tiempo a formatear.
   * @returns Cadena de fecha formateada.
   */
  formatTimestamp(timestamp: number): string {

    return format(new Date(timestamp), 'dd/MM/yyyy');

  }
}
