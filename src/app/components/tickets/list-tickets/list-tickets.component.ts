import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../moduleusers/services/user.service';
import { LinksService } from 'src/app/services/links.service';
import { TicketService } from 'src/app/services/ticket.service';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns';
import { Sucursales } from '../../moduleusers/models/Sucursales';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.css'],
})
export class ListTicketsComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  columns: any[] = [];
  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  dash: MenuItem = {};
  usuario: any = {};
  sucursalseleccionada: Sucursales = {};
  sucursales: any = [];
  idUsuario: string = '';
  departamento: string = '';
  agencia: string = '';
  spinnerLoad2: boolean = false;
  spinnerLoad3: boolean = false;
  mostrarModalArchivos: boolean = false;
  mostrarModalExcel: boolean = false;
  cargandoArchivos: boolean = false;
  listaArchivos: any = [];
  tareaEscogida: any = {};
  myfiles: any[] = [];
  descripcionArchivo: string = '';
  flag: number = 0;
  dateInicio: any = '';
  dateFin: any = '';
  dateNow: any = new Date();
  maxDateValue: any = Date;
  optionIndex: number = 0;
  options: any = [];
  selectedOption: any;
  disabledDownload: string = '';
  rolUser: any;

  constructor(
    private ticketservice: TicketService,
    private linkservice: LinksService,
    private messageService: MessageService,
    private userservice: UserService
  ) {
    this.options = [
      { name: 'Todos', code: 'All' },
      { name: 'Por fechas', code: 'Dates' },
    ];
    // this.selectedOption = this.options[0]
  }
  listaTickets: any = [];
  listaTicketsFilter: any = [];
  loading: boolean = true;
  ngOnInit(): void {
    // this.get_all_vtickets();
    this.maxDateValue = new Date();

    this.getUsuario();
    this.obtenerSucursal();

    this.items = [{ label: 'Tickets' }, { label: 'Todos los tickets' }];
    this.items2 = [
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Documentos adjuntos',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-file-pdf',

        command: () => {
          this.mostrarModalArchivos = true;
          this.getArchivosTareaP();
        },
      },
    ];
    this.dash = {
      icon: 'pi pi-th-large',
      routerLink: '/home-ticket/register/register-sucursal',
    };
  }

  clear(dt1: Table) {
    dt1.filterGlobal('', 'contains');
  }

  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy HH:mm');
  }
  formatTimestampExcel(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy');
  }
  tareaEscogidalist(tareaT: any) {
    this.tareaEscogida = tareaT;
  }

  async openPDF(data: any) {
    data.showspinner = true;
    const idArchivo = await firstValueFrom(this.linkservice.getUrl(data.url));
    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = `${environment.apiUrl}tasks/getarchivos/${idArchivo.idarchivo}/`;
    }

    data.showspinner = false;
  }

  async getArchivosTareaP() {
    this.cargandoArchivos = true;
    try {
      this.listaArchivos = await firstValueFrom(
        this.ticketservice.obtenerArchivosListXId(this.tareaEscogida.tarea)
      );
    } catch (error) {
      this.messageService.add({
        severity: 'info',
        summary: 'No existen archivos',
        detail: 'No existen archivos adjuntos a este ticket!',
      });
      this.listaArchivos = [];

      // Aquí puedes manejar el error de acuerdo a tus necesidades.
      console.error('Se produjo un error al obtener archivos:', error);
    } finally {
      this.cargandoArchivos = false;
    }
  }

  cerrarModalAsignacion() {
    this.mostrarModalArchivos = false;
    this.flag = 0;
    this.descripcionArchivo = '';
  }
  cerrarModalExcel() {
    this.mostrarModalExcel = false;
    this.optionIndex = 0;
    this.dateInicio = '';
    this.dateFin = '';
    this.selectedOption = {};
  }

  async obtenerSucursal() {
    const sucursal = new Promise((resolve, reject) => {
      this.userservice.getSucursales().subscribe((res) => {
        // Agregar la opción "Todos" al inicio del array de sucursales
        res.unshift({ nombresucursal: 'Todos' });
        resolve(res);
      });
    });
    this.sucursales = await sucursal.then((res) => res);

    this.sucursalseleccionada = this.sucursales[0];
    this.sucursalobtenida();
  }

  async sucursalobtenida() {
    this.spinnerLoad2 = true;

    const { nombresucursal } = this.sucursalseleccionada;

    let filtroSucursal: string | undefined;

    // Verificar si la sucursal seleccionada es 'Todos'
    if (nombresucursal === 'Todos') {
      filtroSucursal = ''; // Enviar cadena vacía al servicio
    } else {
      filtroSucursal = nombresucursal; // Enviar la sucursal seleccionada al servicio
    }

    this.ticketservice.getAllTicketsFilter(filtroSucursal).subscribe(
      (data) => {
        if (data) {
          this.listaTicketsFilter = data;
        } else {
          console.log('error');
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.spinnerLoad2 = false;
  }

  async get_all_vtickets() {
    this.spinnerLoad2 = true;

    this.listaTickets = await firstValueFrom(
      this.ticketservice.get_all_vtickets()
    );

    // Obtiene la agencia del usuario para desplegar directamente en la tabla
    // const user = await firstValueFrom(this.userservice.get_usuario(String(localStorage.getItem('user'))))
    // const { iddepartamento } = user;
    // const departamento = await firstValueFrom(this.linkservice.getUrl(iddepartamento))
    // const { idsucursal } = departamento
    // const agencia = await firstValueFrom(this.linkservice.getUrl(idsucursal))

    // this.sucursalseleccionada = agencia

    // this.listaTicketsFilter = this.listaTickets.filter((ticket: any) => {

    //   return ticket.sucursal == agencia.nombresucursal
    // })
    this.listaTicketsFilter = this.listaTickets;

    this.spinnerLoad2 = false;
  }

  handleFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(value, 'contains');
  }

  async getUsuario() {
    try {
      // Obtener el usuario
      const userId = localStorage.getItem('user');
      if (!userId) {
        throw new Error(
          'No se encontró el ID de usuario en el almacenamiento local'
        );
      }

      const usuario = await this.userservice
        .get_usuario(String(userId))
        .toPromise();

      // Obtener el rol del usuario
      const rol = await firstValueFrom(this.linkservice.getUrl(usuario.idrol));
      this.rolUser = rol.idrol;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }
  subirArchivos() {
    this.flag = 1;
  }
  volverListaDocumentos() {
    this.flag = 0;
    // this.activeUpload = 0;
  }
  async myUploaderTicket(event: any) {
    this.spinnerLoad3 = true;

    const file = event.files[0];
    const formData = new FormData();
    const idTareaObtenido = await firstValueFrom(
      this.ticketservice.obtenerTareaId(this.tareaEscogida.tarea)
    );
    const { url } = idTareaObtenido;

    formData.append('pdf_file', file);
    formData.append('idtarea', url);
    formData.append('nombrearchivo', event.files[0].name);
    formData.append(
      'descripcionarchivo',
      'Actividad - ' + this.descripcionArchivo
    );
    formData.append('mimetypearchivo', 'application/pdf');

    this.ticketservice.subirPDF(formData).subscribe(
      (resp) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Archivo Subido!',
          detail: 'El archivo se ha subido correctamente',
        });

        this.descripcionArchivo = '';
        this.spinnerLoad3 = false;
        this.myfiles = [];
        this.getArchivosTareaP();
        // this.ngOnInit();
        this.flag = 0;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Upload fallido',
          detail: error.statusText,
        });
        this.spinnerLoad3 = false;
      }
    );
  }
  descargarExcel() {
    this.mostrarModalExcel = true;
  }
  changeOption() {
    if (this.selectedOption.name == 'Todos') {
      this.optionIndex = 0;
      this.disabledDownload = this.selectedOption.name;
    } else if (this.selectedOption.name == 'Por fechas') {
      this.optionIndex = 1;
      this.disabledDownload = this.selectedOption.name;
    }
  }

  descargar() {
    this.spinnerLoad2 = true;

    const { nombresucursal } = this.sucursalseleccionada;

    let filtroSucursal: string | undefined;
    let filtroFechaInicio: string | undefined;
    let filtroFechaFin: string | undefined;

    if (nombresucursal === 'Todos') {
      filtroSucursal = '';
    } else {
      filtroSucursal = nombresucursal;
    }

    filtroFechaInicio = this.dateInicio
      ? this.formatTimestampExcel(this.dateInicio)
      : '';
    filtroFechaFin = this.dateFin
      ? this.formatTimestampExcel(this.dateFin)
      : '';

    this.ticketservice
      .downloadTicketsExcel(filtroSucursal, filtroFechaInicio, filtroFechaFin)
      .subscribe(
        (data: Blob) => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'tickets.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          this.messageService.add({
            severity: 'success',
            summary: 'Descarga exitosa!',
            detail: 'El reporte se ha generado exitosamente',
          });
          this.mostrarModalExcel = false;
          this.spinnerLoad2 = false;
        },
        (error) => {
          console.log('Error en la solicitud:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Descarga fallida',
            detail: 'Intente nuevamente más tarde',
          });
          // this.mostrarModalExcel=false;
          this.spinnerLoad2 = false;
        }
      );
  }
}
