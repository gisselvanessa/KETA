import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsModule } from './tickets/tickets.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ModuleusersModule } from './moduleusers/moduleusers.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MenuUsersModule } from './menu-users/menu-users.module';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    TicketsModule,
    SettingsModule,
    FormsModule,
    ModuleusersModule,
    ComponentsRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    MenuUsersModule 

  ]
})
export class ComponentsModule { }
