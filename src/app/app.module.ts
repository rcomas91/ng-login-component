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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespuestasComponent } from './necesidad/respuestas/respuestas.component';
import { Respuestas1Component } from './necesidad/respuestas1/respuestas1.component';
import { PozoComponent } from './pozo/pozo.component';
import { PozoService } from './pozo/pozo.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridTile, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSort, MatSortModule, MatTableDataSource, MatTableModule, MatToolbarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IntervaloComponent } from './intervalo/intervalo.component';
import { PozoFormComponent } from './pozo/pozo-form.component';
import { IntervaloFormComponent } from './intervalo/intervalo-form.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { WinatmComponent } from './winatm/winatm.component';
import { MatSelectModule } from '@angular/material/select';
import { ArticuloFormComponent } from './articulo/articulo-form.component';
import { ConstruccionService } from './pozo/construccion.service';



const routes:Routes=[
  {path:'',redirectTo:'/winatm',pathMatch:'full'},
  {path:'articulos',component:ArticuloComponent},
  {path:'articulos/form',component:ArticuloFormComponent},
  {path:'articulos/form/:id',component:ArticuloFormComponent},

  {path:'winatm',component:WinatmComponent},
  {path:'necesidades',component:NecesidadComponent},
  {path:'necesidades/form',component:FormComponent},
  {path:'necesidades/form/:id',component:FormComponent},
  {path:'Satisfechas',component:RespuestasComponent},
  {path:'NoSatisfechas',component:Respuestas1Component},

  {path:'pozos',component:PozoComponent},
  {path:'pozos/form',component:PozoFormComponent},
  {path:'pozos/form/:id',component:PozoFormComponent},

  {path:'intervalos',component:IntervaloComponent},
  {path:'intervalos/form',component:IntervaloFormComponent},
  {path:'intervalos/form/:id',component:IntervaloFormComponent},

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
    PozoComponent,
    IntervaloComponent,
    PozoFormComponent,
    IntervaloFormComponent,
    WinatmComponent,
    ArticuloFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MatSortModule,
    MatGridListModule,
    HttpClientModule,
    MatSliderModule,
    MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  BrowserAnimationsModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatPaginatorModule,
  MatAutocompleteModule,

  ],
  providers: [ArticuloService,NecesidadService ,PozoService,ConstruccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
