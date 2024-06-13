import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'date-fns';
import { MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css'],
})
export class HolidaysComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;

  items: MenuItem[] = [];
  dash: MenuItem = {};
  date14: any = Date;
  activeModal = false;
  activeModalDelete = false;
  descripcion: string = '';
  status: boolean = true;
  idHoliday: number = 0;
  action: string = '';
  fecha: Date | undefined;
  choosenHoliday: any = {};
  items2: MenuItem[] = [];
  listaHolidays: any = [];
  rangeDates: Date[]=[];
  constructor(
    private settingsservice : SettingsService,
    private messageService: MessageService,

  ) {}

  ngOnInit(): void {
    
    this.items = [{ label: 'Configuraciones' }, { label: 'Días festivos' }];
    this.items2 = [
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Editar',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-pencil',

        command: () => {
          this.activeModal = true;
          this.action = 'Editar';
          this.setHoliday();
        },
      },
      {
        tooltip: 'top',
        tooltipPosition: 'top',
        tooltipOptions: {
          appendTo: 'body',
          tooltipLabel: 'Eliminar',
          tooltipPosition: 'top',
        },
        icon: 'pi pi-trash',

        command: () => {
          this.activeModalDelete=true;
          this.action = 'Eliminar';
          this.setHoliday();

          // this.mostrarModalArchivos = true;
          // this.getArchivosTareaP();
        },
      },
    ];
    this.dash = {
      icon: 'pi pi-cog',
      routerLink: '/home-ticket/configuraciones',
    };
    this.getDataInfo();
  }

  addEvent() {
    this.activeModal = true;
    this.action = 'Agregar';
  }

  guardarFestividad(formulario: NgForm) {

    if (formulario.valid) {
      const row_obj={
        "descripciondiasfestivos": this.descripcion ,
        "fecha": this.rangeDates
      }
      
      
      this.settingsservice.create(row_obj).subscribe(
        data => {
          if(data){
          // if(data.message == 'success'){
            this.messageService.add({ severity: 'success', summary: 'Fecha agregada', detail: 'El día festivo ha sido agregado correctamente' });
            this.getDataInfo();

            this.activeModal = false;
  
          } else {
            this.activeModal = true;
  
            // this.messagesPopups.popupMessage('Error: '+ data.message);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No existen días festivos agregados!' });
  
          }
        },
        (error) => {
          this.activeModal = true;
  
          this.messageService.add({ severity: 'error', summary: 'Error al crear fecha', detail: 'Ya existe la fecha establecida' });
          console.error('Error al obtener datos:', error);
        }
      );
    }
  }

  holidayEscogidalist(tareaT: any) {

    this.choosenHoliday = tareaT;
  }
  clear(dt1: Table) {
    dt1.filterGlobal('', 'contains');
  }

  handleFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.dt1.filterGlobal(value, 'contains');
  }
  setHoliday(){
      
    this.rangeDates = [new Date(this.choosenHoliday.fecha)]
    this.fecha = new Date(this.choosenHoliday.fecha)
    this.descripcion = this.choosenHoliday.descripciondiasfestivos
    this.idHoliday = this.choosenHoliday.iddiasfestivos
    this.status = this.choosenHoliday.status
}
  editarFestividad(formulario: NgForm) {

    if (formulario.valid) {
      const row_obj={
        "descripciondiasfestivos": this.descripcion ,
        "fecha": this.fecha,
        "iddiasfestivos": this.idHoliday,
        "status": this.status
      }
      
      this.settingsservice.update(row_obj).subscribe(
        data => {
          if(data){
          // if(data.message == 'success'){
            this.messageService.add({ severity: 'success', summary: 'Fecha editada', detail: 'La fecha se ha actualizado correctamente' });
               this.getDataInfo();

            this.activeModal = false;
  
          } else {
            this.activeModal = true;
  
            // this.messagesPopups.popupMessage('Error: '+ data.message);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Solicitud incorrecta' });
  
          }
        },
        (error) => {
          this.activeModal = true;
  
          this.messageService.add({ severity: 'error', summary: 'Error al actualizar', detail: 'Intente más tarde' });
          console.error('Error al obtener datos:', error);
        }
      );
    }
  }

  eliminarFestividad() {

      const row_obj={
        "descripciondiasfestivos": this.descripcion ,
        "fecha": this.fecha,
        "iddiasfestivos": this.idHoliday
      }
      this.settingsservice.delete(row_obj.iddiasfestivos).subscribe(
        data => {
          if(data){
          // if(data.message == 'success'){
            this.messageService.add({ severity: 'success', summary: 'Fecha eliminada', detail: 'Se removió la fecha!' });
            this.ngOnInit();
            this.activeModalDelete = false;
  
          } else {
            this.activeModalDelete = true;
  
            // this.messagesPopups.popupMessage('Error: '+ data.message);
            this.messageService.add({ severity: 'error', summary: 'No se pudo eliminar', detail: 'Inténtelo más tarde' });
  
          }
        },
        (error) => {
          this.activeModalDelete = true;
  
          this.messageService.add({ severity: 'error', summary: 'No se pudo eliminar', detail: 'Solicitud incorrecta' });
          console.error('Error al obtener datos:', error);
        }
      );
  }

  
  formatTimestamp(timestamp: number): string {
    return format(new Date(timestamp), 'dd-MM-yyyy HH:mm');
  }
  cerrarModalHoliday(formulario: NgForm) {

    this.activeModal = false;
    this.fecha=undefined;
    this.descripcion = '';
    this.rangeDates = [];
    this.status = true;
    this.choosenHoliday = {};
    formulario.reset();
  }

  getDataInfo() {

    this.settingsservice.getAllData().subscribe(
      data => {
        if(data){
          this.listaHolidays = data;
          
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
}
