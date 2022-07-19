import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';


import{HttpClientModule, HttpClient} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridTile, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSort, MatSortModule, MatTableDataSource, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MatGridListModule} from '@angular/material/grid-list';
import { WinatmComponent } from './winatm/winatm.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';
import { WinatmService } from './winatm/winatm.service';
import { createCustomElement } from '@angular/elements';


@NgModule({

    declarations: [
   WinatmComponent,


  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    FormsModule,


    ToastrModule.forRoot({

    maxOpened:0,
    autoDismiss	:true,
    preventDuplicates: true,
    }
    ), // ToastrModule added


    MatSortModule,
    MatGridListModule,

    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatTabsModule,
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
  MatIconModule,
  MatAutocompleteModule,
  MatTableExporterModule,
  MatChipsModule,
  MatCheckboxModule,

  ],
  entryComponents:[WinatmComponent],
  providers: [WinatmService],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {
    const ngBusquedaElement = createCustomElement(WinatmComponent, { injector:this.injector });
    customElements.define('ng-busqueda-almacen', ngBusquedaElement);
  }


 ngDoBootstrap() {
  }
}
