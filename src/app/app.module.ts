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
const routes:Routes=[
  {path:'',redirectTo:'/articulos',pathMatch:'full'},
  {path:'articulos',component:ArticuloComponent},

]
@NgModule({
 
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    FooterComponent,
    ArticuloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [ArticuloService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
