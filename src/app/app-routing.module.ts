import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutingModule } from './components/components-routing.module';


const routes: Routes = [

  {
    path:'keta',
    loadChildren: ()=> import('src/app/components/components.module').then(m=>m.ComponentsModule)
  }
  ,{
    path:'**', redirectTo: '/keta'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), ComponentsRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
