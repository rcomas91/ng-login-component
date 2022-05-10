import { Component } from '@angular/core';
import { UserService } from 'src/assets/images/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAutenticado:boolean=false;
  constructor(public userService:UserService){

  }

      }


