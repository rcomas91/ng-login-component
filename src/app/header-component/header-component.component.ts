import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/assets/images/user.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(public userService:UserService, public router:Router) { }

  ngOnInit() {
  }

  Logout(){
    this.userService.isAutenticado=false;
    this.router.navigateByUrl('/login')
    console.log("Bye Bye")
  }

}
