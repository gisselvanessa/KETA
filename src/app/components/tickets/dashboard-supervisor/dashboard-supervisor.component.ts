/**
 * Componente para el panel de control del supervisor y visualización de detalles de tareas.
 */
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LinksService } from 'src/app/services/links.service';
import { TicketService } from 'src/app/services/ticket.service';
import { format } from 'date-fns'; 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard-supervisor',
  templateUrl: './dashboard-supervisor.component.html',
  styleUrls: ['./dashboard-supervisor.component.css']
})

export class DashboardSupervisorComponent implements OnInit {

  items: MenuItem[]  = [];
  listaTareas : any = [];
  usuario : any = {};
  dash: MenuItem = {}; 
  responsiveOptions : any =[];
  listaTareasEnTramite : any = [];
  listaTareaEstadoColor : any = [];
  listaTareasAbierto : any = [];
  tareaUsuario : any = {};
  mostrarModalAsignacion : boolean = false;
  tareaDialog :any = {};
  listaTareasPendiente: any = [];


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

    await this.getAllTareas();

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

      {label:'Asignación y finalización de casos'},

    ];

    this.dash = {icon: 'pi pi-th-large', routerLink: '/home-ticket/dashboard/ticket-table'};

  }




   /**
   * Recibe información del componente hijo enviarInformacion y la almacena en la lista de tareas en trámite.
   * @param informacion Información recibida del componente hijo.
   */
  recibirInformacion(informacion: any) {
   
    // this.listaTareasEnTramite = informacion;

    // this.listaTareaEstadoColor = this.listaTareasEnTramite;
    this.listaTareasPendiente = informacion
    
  }




  /**
   * Obtiene todas las tareas y las filtra según su estado.
   */
  async getAllTareas() {

    const { url, idusuario } = this.usuario;

    // OBTENER LISTA DE TAREAS CON ESTADO Abierto

    // this.listaTareasAbierto = await firstValueFrom(this.ticketservice.obtenerVtareasXEstado('Abierto'))

    // OBTENER LISTA DE TAREAS CON ESTADO PENDIENTE

    // this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerVtareasXEstado('Pendiente','P'));

     // Filtra solo los que AUN NO se VENCEN

     const fechaActual = new Date();

     this.listaTareasPendiente = this.listaTareasPendiente.filter((tarea:any) => {
       
      // Convierte la fecha de entrega de la tarea a un objeto Date

       const fechaEntrega = new Date(tarea.fechaentrega);

      // Compara la fecha de entrega con la fecha actual

       return fechaEntrega.getTime() > fechaActual.getTime();

     });

    // Ordena la lista por el atributo "numeroTicket" de forma descendente

    // this.listaTareasPendiente.sort((a:any, b:any) => a.tarea - b.tarea);
    
  }

  


  /**
   * Abre un modal para mostrar los detalles de una tarea.
   * @param tarea Tarea de la que se mostrarán los detalles.
   */
  async abrirModalDetalleTarea(tarea :any){

    this.mostrarModalAsignacion=true;

    this.tareaDialog = tarea;

  }




  /**
   * Cierra el modal de detalles de tarea.
   */
  cerrarModalDetalleTarea(){

    this.mostrarModalAsignacion=false;

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
