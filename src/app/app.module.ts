import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components/components-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // FormsModule,
    ComponentsModule,
    AppRoutingModule,
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
