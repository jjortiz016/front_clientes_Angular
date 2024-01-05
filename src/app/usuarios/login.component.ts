import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {

  titulo:string= "Please sign in";
  usuario: Usuario;

  constructor(){
    this.usuario = new Usuario(); //incializamos el usuario
  }
  ngOnInit(): void {
      
  }
   login(): void{
      console.log(this.usuario);
      if(this.usuario.username ==  null || this.usuario.password == null){
       
        Swal.fire('Error Login', 'Username o password vacias!' , 'error' );
        return;
      }
   }

}
