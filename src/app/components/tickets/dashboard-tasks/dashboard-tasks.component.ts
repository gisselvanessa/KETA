import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LinksService } from 'src/app/services/links.service';
import { TicketService } from 'src/app/services/ticket.service';
import { format } from 'date-fns'; 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['./dashboard-tasks.component.css']
})
export class DashboardTasksComponent implements OnInit {
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

  constructor(private ticketservice: TicketService, private linkservice: LinksService,
    private messageService: MessageService) { }


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
     
    {label:'Tickets'},
    // {icon:'fas fa-angle-right'},
    {label:'Mis tareas'},

];

this.dash = {icon: 'pi pi-ticket', routerLink: '/home-ticket/dashboard-tasks/my-tasks'};
  }
  recibirInformacion(informacion: any) {
   
    this.listaTareasEnTramite = informacion;

    this.listaTareaEstadoColor = this.listaTareasEnTramite;
    
  }


  async getAllTareas() {

    const { url, idusuario } = this.usuario;
    this.listaTareasAbierto = await firstValueFrom(this.ticketservice.obtenerVtareasXEstado('Abierto', 'P'))

    // OBTENER LISTA DE TAREAS CON ESTADO PENDIENTE
    this.listaTareasPendiente = await firstValueFrom(this.ticketservice.obtenerVtareasXEstado('Pendiente', 'P'));

    // Ordena la lista por el atributo "numeroTicket" de forma descendente
    this.listaTareasPendiente.sort((a:any, b:any) => a.tarea - b.tarea);
  }

  
  async abrirModalDetalleTarea(tarea :any){

    this.mostrarModalAsignacion=true;
    this.tareaDialog = tarea;
    
  }

  cerrarModalDetalleTarea(){
    this.mostrarModalAsignacion=false;
  }
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd/MM/yyyy');
  }

}
