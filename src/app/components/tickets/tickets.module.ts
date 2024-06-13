import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {PanelModule} from 'primeng/panel';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { TicketTableComponent } from './ticket-table/ticket-table.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import {CalendarModule} from 'primeng/calendar';
import {CarouselModule} from 'primeng/carousel';
import {TimelineModule} from 'primeng/timeline';
import { Toast, ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { StepsModule } from 'primeng/steps';
import {InputNumberModule} from 'primeng/inputnumber';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsRoutingModule } from '../components-routing.module';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {SpeedDialModule} from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { TicketTableSupervisorComponent } from './ticket-table-supervisor/ticket-table-supervisor.component';
import { DashboardSupervisorComponent } from './dashboard-supervisor/dashboard-supervisor.component';
import { MaterialModule } from 'src/app/material.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TicketTableAsistenteComponent } from './ticket-table-asistente/ticket-table-asistente.component';
import { DashboardAsistenteComponent } from './dashboard-asistente/dashboard-asistente.component';
import { MisTareasComponent } from './mis-tareas/mis-tareas.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
import { ReportesComponent } from './reportes/reportes.component';
import {AccordionModule} from 'primeng/accordion';
import { TicketTableOperadorComponent } from './ticket-table-operador/ticket-table-operador.component';
import { DashboardOperadorComponent } from './dashboard-operador/dashboard-operador.component';
import { TicketTrackingComponent } from './ticket-tracking/ticket-tracking.component';
import { DashboardTasksComponent } from './dashboard-tasks/dashboard-tasks.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
// import {TooltipModule} from 'primeng/tooltip';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    SidebarComponent, 
    DashboardComponent, 
    TicketTableComponent, 
    TicketFormComponent, 
    ListTicketsComponent, 
    TicketTableSupervisorComponent, 
    DashboardSupervisorComponent, 
    TicketTableAsistenteComponent, 
    DashboardAsistenteComponent, 
    MisTareasComponent, 
    ReportesComponent, 
    TicketTableOperadorComponent, 
    DashboardOperadorComponent, 
    TicketTrackingComponent, 
    DashboardTasksComponent, 
    NotificacionesComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    RouterModule,
    ComponentsRoutingModule,
    PanelModule,
    BreadcrumbModule,
    TableModule,
    CardModule,
  ButtonModule,
  CalendarModule,TimelineModule,
  ToastModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  FileUploadModule,
  HttpClientModule,
    StepsModule,
    InputNumberModule,
    KeyFilterModule,
    ConfirmDialogModule,
    DialogModule,
    SpeedDialModule,
    TooltipModule,
    CarouselModule,
    MaterialModule,
    ProgressSpinnerModule,
    MatDatepickerModule,
    ProgressBarModule,
    AccordionModule,
    ConfirmPopupModule
    

  ],
  providers:[MessageService,ConfirmationService]
})
export class TicketsModule { }
