import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { TicketService } from 'src/app/services/ticket.service';
import { firstValueFrom } from 'rxjs';
import { format } from 'date-fns';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  dash: MenuItem = {};
  dateInicio: any = '';
  dateFin: any = '';
  dateNow: any = new Date();
  maxDateValue: any = Date;
  activeIndex: number = 0;
  warningMessage: string = '';
  spinnerLoad2: boolean = false;

  constructor(private ticketService: TicketService, private messageService: MessageService) { }
  listaReporte: any = [];

  ngOnInit(): void {

    this.maxDateValue = new Date();
    this.listaReporte = [];
    this.items = [

      { label: 'Reportes' },
      { label: 'Generar reporte' },

    ];
    this.dash = { icon: 'fas fa-fw fa-chart-area', routerLink: '/home-ticket/reportes' };

    this.dateNow = this.formatTimestampXml(this.dateNow);
  }
  loading = [false, false, false, false]
  loading2 = [false, false, false, false]

  async load(index: any) {
    this.loading[index] = true;
    setTimeout(async () => {

      this.loading[index] = false;

      this.ticketService.downloadFile(this.formatTimestamp(this.dateInicio), this.formatTimestamp(this.dateFin))
        .subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/xml' });

          // Create a URL for the blob data
          const url = window.URL.createObjectURL(blob);

          // Create an anchor element to trigger the download
          const a = document.createElement('a');
          a.href = url;
          a.download = `CI01_123456789001_${this.dateNow}.xml`; // Specify the filename

          // Trigger the click event to start the download
          a.click();

          // Clean up resources
          window.URL.revokeObjectURL(url);
        });
    }
      , 500);

  }

  async ver() {
    this.spinnerLoad2 = true;


    if (this.dateInicio !== '' && this.dateFin !== '') {
      // Comprueba si la fecha de inicio es mayor que la fecha final
      if (this.dateInicio > this.dateFin) {
        this.messageService.add({ severity: 'warn', summary: 'Fechas inválidas', detail: 'La fecha de inicio no puede ser mayor que la fecha final' });
        this.listaReporte = [];
        return; // Detiene la ejecución si las fechas son inválidas
      }

      try {
        this.listaReporte = await firstValueFrom(this.ticketService.obtenerReportesVista(this.formatTimestamp(this.dateInicio), this.formatTimestamp(this.dateFin)));

        // Resto de tu lógica
        this.activeIndex = 1;
        this.messageService.add({ severity: 'success', summary: 'Reporte generado', detail: 'Se ha generado el reporte correctamente' });
        this.spinnerLoad2 = false;

      } catch (error: any) {
        // Resto de tu manejo de errores
        this.listaReporte = [];
        this.messageService.add({ severity: 'warn', summary: 'No existen datos', detail: 'No se encontraron registros en ese período de tiempo' });
        this.spinnerLoad2 = false;

      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Hay campos vacíos', detail: 'No se pueden ver los registros' });
      this.spinnerLoad2 = false;

    }
  }

  formatTimestampTable(timestamp: number): string {
    return format(new Date(timestamp), 'yyyy-MM-dd HH:mm');
  }
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'yyyy-MM-dd');
  }
  formatTimestampXml(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy');
  }

  handleFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(value, 'contains');
  }

  clear(dt1: Table) {
    dt1.filterGlobal('', 'contains');
  }
}

