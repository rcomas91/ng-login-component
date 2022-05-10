import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/assets/images/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  passwordError: boolean;

  constructor(public userService: UserService) {}

  // register() {
  //   console.log(this.email);
  //   console.log(this.password);
  // }


  register() {
    const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
