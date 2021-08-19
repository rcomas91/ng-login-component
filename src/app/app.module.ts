import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponent } from './footer/footer.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { ArticuloService } from './articulo/articulo.service';
import{RouterModule, Routes } from '@angular/router';
import{HttpClientModule, HttpClient} from '@angular/common/http';
import { NecesidadComponent } from './necesidad/necesidad.component';
import { NecesidadService } from './necesidad/necesidad.service';
import { FormComponent } from './necesidad/form.component';
import { FormsModule } from '@angular/forms';
import { RespuestasComponent } from './necesidad/respuestas/respuestas.component';
import { Respuestas1Component } from './necesidad/respuestas1/respuestas1.component';
import { PozoComponent } from './pozo/pozo.component';
import { PozoService } from './pozo/pozo.service';

const routes:Routes=[
  {path:'',redirectTo:'/articulos',pathMatch:'full'},
  {path:'articulos',component:ArticuloComponent},
  {path:'necesidades',component:NecesidadComponent},
  {path:'necesidades/form',component:FormComponent},
  {path:'necesidades/form/:id',component:FormComponent},
  {path:'Satisfechas',component:RespuestasComponent},
  {path:'NoSatisfechas',component:Respuestas1Component},
  {path:'pozos',component:PozoComponent},


]
@NgModule({
 
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponent,
    ArticuloComponent,
    NecesidadComponent,
    FormComponent,
    RespuestasComponent,
    Respuestas1Component,
    PozoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ArticuloService,NecesidadService ,PozoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
