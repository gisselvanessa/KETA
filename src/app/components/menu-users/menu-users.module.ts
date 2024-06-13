import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { AsistenteComponent } from './asistente/asistente.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsRoutingModule } from '../components-routing.module';
import {AccordionModule} from 'primeng/accordion';
import { MatExpansionModule } from '@angular/material/expansion'; // Importa el módulo de expansión
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OperadorComponent } from './operador/operador.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { ProfileTecnicoComponent } from './tecnico/profile-tecnico/profile-tecnico.component';
import { ProfileAsistenteComponent } from './asistente/profile-asistente/profile-asistente.component';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AdminComponent,
    TecnicoComponent,
    AsistenteComponent,
    OperadorComponent,
    ProfileAdminComponent,
    ProfileTecnicoComponent,
    ProfileAsistenteComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    ComponentsRoutingModule,
    AccordionModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    OverlayPanelModule,
    CardModule,
    MatTooltipModule,
    PanelMenuModule,
    AvatarModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class MenuUsersModule { }
