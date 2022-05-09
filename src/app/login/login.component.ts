import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/assets/images/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public userService:UserService) {}

  // login() {
  //   console.log(this.email);
  //   console.log(this.password);
  // }

  login() {
    const user = {email: this.email, password: this.password};
    this.userService.login(user).subscribe( data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
