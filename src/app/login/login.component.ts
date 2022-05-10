import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/assets/images/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public userService:UserService, public router:Router) {}

  login() {
    if(this.email=="rcomas@epepc.cupet.cu" && this.password=="12345678"){
      this.userService.isAutenticado=true;
    this.router.navigateByUrl('/');
    }
    else{
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
