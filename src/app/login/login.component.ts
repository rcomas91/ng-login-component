import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  constructor(public userService:UserService) {}

  login() {
    if(this.email=="rcomas@epepc.cupet.cu" && this.password=="12345678"){
      this.userService.isAutenticado=true;
      console.log(this.userService.isAutenticado)
   // this.router.navigateByUrl('/winatm');
    }
    else{
      console.log(this.userService.isAutenticado)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario y contraseña incorrecto!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })    }

    console.log(this.email);
    console.log(this.password);
  }

  // login() {
  //   const user = {email: this.email, password: this.password};
  //   this.userService.login(user).subscribe( data => {
  //     console.log(data);
  //   });
  // }

  ngOnInit() {
  }

}
