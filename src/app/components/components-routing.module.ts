import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './moduleusers/login/login.component';
import { RegisterUserComponent } from './moduleusers/register-user/register-user.component';
import { SidebarComponent } from './tickets/sidebar/sidebar.component';
import { DashboardComponent } from './tickets/dashboard/dashboard.component';
import { TicketTableComponent } from './tickets/ticket-table/ticket-table.component';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form.component';
import { RegisterStepsComponent } from './moduleusers/register-steps/register-steps.component';
import { RegisterSucursalComponent } from './moduleusers/register-sucursal/register-sucursal.component';
import { ListUsersComponent } from './moduleusers/list-users/list-users.component';
import { ListTicketsComponent } from './tickets/list-tickets/list-tickets.component';
import { AdminGuard } from '../guards/admin.guard';
import { TecnicoGuard } from '../guards/tecnico.guard';
import { AdminComponent } from './menu-users/admin/admin.component';
import { TecnicoComponent } from './menu-users/tecnico/tecnico.component';
import { AsistenteComponent } from './menu-users/asistente/asistente.component';
import { AsistenteGuard } from '../guards/asistente.guard';
import { TicketTableSupervisorComponent } from './tickets/ticket-table-supervisor/ticket-table-supervisor.component';
import { DashboardSupervisorComponent } from './tickets/dashboard-supervisor/dashboard-supervisor.component';
import { TicketTableAsistenteComponent } from './tickets/ticket-table-asistente/ticket-table-asistente.component';
import { DashboardAsistenteComponent } from './tickets/dashboard-asistente/dashboard-asistente.component';
import { MisTareasComponent } from './tickets/mis-tareas/mis-tareas.component';
import { ReportesComponent } from './tickets/reportes/reportes.component';
import { OperadorComponent } from './menu-users/operador/operador.component';
import { OperadorGuard } from '../guards/operador.guard';
import { DashboardOperadorComponent } from './tickets/dashboard-operador/dashboard-operador.component';
import { TicketTableOperadorComponent } from './tickets/ticket-table-operador/ticket-table-operador.component';
import { TicketTrackingComponent } from './tickets/ticket-tracking/ticket-tracking.component';
import { DashboardTasksComponent } from './tickets/dashboard-tasks/dashboard-tasks.component';
import { NotificacionesComponent } from './tickets/notificaciones/notificaciones.component';
import { HolidaysComponent } from './settings/holidays/holidays.component';
import { SettingsOptComponent } from './settings/settings-opt/settings-opt.component';
import { EditUserComponent } from './moduleusers/edit-user/edit-user.component';
import { ProfileAdminComponent } from './menu-users/admin/profile-admin/profile-admin.component';
import { ProfileAsistenteComponent } from './menu-users/asistente/profile-asistente/profile-asistente.component';
import { ProfileTecnicoComponent } from './menu-users/tecnico/profile-tecnico/profile-tecnico.component';
import { ListUsersActiveComponent } from './moduleusers/list-users-active/list-users-active.component';
const routerOptions: ExtraOptions = {
  useHash: true,
};
const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
  },

  {
    path:'home-ticket',
    component:AdminComponent,
    canActivate: [
      AdminGuard
    ],
    children: [
      {
        path:'dashboard-supervisor',
        component:DashboardSupervisorComponent,
        children:[{
          path:'ticket-table-supervisor',
          component: TicketTableSupervisorComponent
        },
        
        ]

      },
      {
        path:'dashboard-tasks',
        component:DashboardTasksComponent,
        children:[{
          path: 'my-tasks',
          component : MisTareasComponent
        },
        
        ]
      },
      
      {
        path:'register',
        component:RegisterStepsComponent,
        children:[{
          path:'register-sucursal',
          component: RegisterSucursalComponent
        },
        {
          path:'register-user',
          component: RegisterUserComponent
        },

      
      ]
        ////agregar los demás componentes
      },
      {
        path:'list-users',
        component:ListUsersComponent,
        ////agregar los demás componentes
      },
      {
        path:'list-users/:id',
        component:EditUserComponent,
        ////agregar los demás componentes
      },
      {
        path:'list-tickets',
        component:ListTicketsComponent,
        ////agregar los demás componentes
      },
      {
        path:'reportes',
        component:ReportesComponent,
        ////agregar los demás componentes
      },
      {
        path: 'ticket-tracking',
        component : TicketTrackingComponent
      },
      {
        path: 'notificaciones',
        component : NotificacionesComponent
      },
      {
        path: 'configuraciones',
        component : SettingsOptComponent,
      
      },
      {
        path: 'configuraciones-holidays',
        component : HolidaysComponent,
      
      },
      {
        path: 'profile',
        component : ProfileAdminComponent,
      
      }
      
    ]
  },
  {
    path:'tecnico-ticket',
    component:TecnicoComponent,
    canActivate: [
      TecnicoGuard
    ],
    children: [
      {
        path:'dashboard',
        component:DashboardComponent,
        children:[{
          path:'ticket-table',
          component: TicketTableComponent
        },


        
        ]
        ////agregar los demás componentes

        
      },
      
      {
        path:'ticket-form',
        component:TicketFormComponent,
        ////agregar los demás componentes
      },
      {
        path:'register',
        component:RegisterStepsComponent,
        children:[{
          path:'register-sucursal',
          component: RegisterSucursalComponent
        },
        {
          path:'register-user',
          component: RegisterUserComponent
        },
        

      
      ]
        ////agregar los demás componentes
      },
      {
        path:'list-users',
        component:ListUsersActiveComponent,
        ////agregar los demás componentes
      },
      {
        path:'list-tickets',
        component:ListTicketsComponent,
        ////agregar los demás componentes
      },
      {
        path: 'my-tasks',
        component : MisTareasComponent
      },
      {
        path: 'notificaciones',
        component : NotificacionesComponent
      },
      {
        path: 'profile',
        component : ProfileTecnicoComponent,
      
      }
    ]
  },
  {
    path:'operador-ticket',
    component:OperadorComponent,
    canActivate: [
      OperadorGuard
    ],
    children: [
      {
        path:'dashboard-operador',
        component:DashboardOperadorComponent,
        children:[{
          path:'ticket-table-operador',
          component: TicketTableOperadorComponent
        },

        ]

      },
      
      {
        path:'list-users',
        component:ListUsersComponent,
        ////agregar los demás componentes
      },
      {
        path:'list-tickets',
        component:ListTicketsComponent,
        ////agregar los demás componentes
      }
      

    ]
  },
  {
    path:'asistente-ticket',
    component:AsistenteComponent,
    canActivate: [
      AsistenteGuard
    ],
    children: [
      {
        path:'dashboard-asistente',
        component:DashboardAsistenteComponent,
        children:[{
          path:'ticket-table-asistente',
          component: TicketTableAsistenteComponent
        },


        
        ]
        ////agregar los demás componentes

        
      },
      
      {
        path:'ticket-form',
        component:TicketFormComponent,
        ////agregar los demás componentes
      },
      {
        path:'list-tickets',
        component:ListTicketsComponent,
        ////agregar los demás componentes
      },
      {
        path: 'my-tasks',
        component : MisTareasComponent
      },
      {
        path: 'profile',
        component : ProfileAsistenteComponent,
      
      }
    ]
  },
  {
    path: '**', component: LoginComponent
  },
  {
    path: '**',
    component: LoginComponent,
    redirectTo: '', // Redirecciona al LoginComponent
    pathMatch: 'full'
  },
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash:true})
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsRoutingModule { 


}
