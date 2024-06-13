import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysComponent } from './holidays/holidays.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsRoutingModule } from '../components-routing.module';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { StepsModule } from 'primeng/steps';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';
import { MaterialModule } from 'src/app/material.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SettingsOptComponent } from './settings-opt/settings-opt.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InputSwitchModule } from 'primeng/inputswitch';



@NgModule({
  declarations: [
    HolidaysComponent,
    SettingsOptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    ComponentsRoutingModule,
    PanelModule,
    BreadcrumbModule,
    TableModule,
    CardModule,
    ButtonModule,
    CalendarModule, TimelineModule,
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
    ConfirmPopupModule,
    FullCalendarModule,
    InputSwitchModule
    
  ],
  providers: [MessageService, ConfirmationService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
