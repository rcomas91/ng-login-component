import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Injector } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'NgCamisaComponentComponent',
  template: `
  <ng-template #loading>Loading....</ng-template>
  <ng-template #error>Loading failed...</ng-template>
    <!-- will be lazy loaded and uses standard Angular template bindings -->
    <ng-camisa-component
      *axLazyElement="elementUrl;loadingTemplate:loading
      ;errorTemplate:error"

    >
    </ng-camisa-component>
  `,
})
export class NgCamisaComponentComponent {

  constructor(private injector:Injector, private http: HttpClient){}
  elementUrl = 'http://localhost:3000/dist/ng-camisa-component/camisacomp.js';

}
