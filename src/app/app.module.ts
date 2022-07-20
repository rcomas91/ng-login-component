import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';


import{HttpClientModule, HttpClient} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridTile, MatIconModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatRadioModule, MatSort, MatSortModule, MatTableDataSource, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ToastrModule } from 'ngx-toastr';
import { createCustomElement } from '@angular/elements';
import { LoginComponent } from './login/login.component';
import { UserService } from './login/user.service';
import { RouterModule } from '@angular/router';


@NgModule({

    declarations: [

   LoginComponent,


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
  entryComponents:[LoginComponent],
  providers: [UserService],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {
    const ngLoginElement = createCustomElement(LoginComponent, { injector:this.injector });
    customElements.define('ng-login-component', ngLoginElement);
  }


 ngDoBootstrap() {
  }
}
