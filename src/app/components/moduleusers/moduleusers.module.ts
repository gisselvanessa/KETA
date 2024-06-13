import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModuleimport { PasswordModule } from 'primeng/password';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrimeIcons} from 'primeng/api';
import {ToastModule} from 'primeng/toast'
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {TimelineModule} from 'primeng/timeline';
import {StepsModule} from 'primeng/steps';
import { RegisterStepsComponent } from './register-steps/register-steps.component';
import { RegisterSucursalComponent } from './register-sucursal/register-sucursal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListUsersComponent } from './list-users/list-users.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ComponentsRoutingModule } from '../components-routing.module';
import { InterceptorService } from 'src/app/services/interceptor.service';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';
import {BadgeModule} from 'primeng/badge';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { MaterialModule } from 'src/app/material.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditUserComponent } from './edit-user/edit-user.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListUsersActiveComponent } from './list-users-active/list-users-active.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RegisterStepsComponent,
    RegisterSucursalComponent,
    ListUsersComponent,
    EditUserComponent,
    ListUsersActiveComponent,

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
    ReactiveFormsModule,
    ToastModule,
    MatSnackBarModule,
    TimelineModule,
    StepsModule,
    BrowserAnimationsModule,
    TableModule,
    InputTextModule,
    BreadcrumbModule,
    KeyFilterModule,
    InputTextModule,
    ProgressSpinnerModule,
    BadgeModule,
    ScrollPanelModule,
    MaterialModule,
    ProgressBarModule,
    SpeedDialModule,
    InputSwitchModule
  
    
  ],
  providers:[
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true

    },
    PrimeIcons

  ]
})
export class ModuleusersModule { }
