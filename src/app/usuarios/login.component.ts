import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {

  titulo:string= "Please sign in";
  usuario: Usuario;

  constructor(private authservice: AuthService, private router: Router){
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
      this.authservice.login(this.usuario).subscribe(response => {
          console.log(response);
          //split convierte string en un arreglo y cada elemento corresponde a una seccion del
          //token que esta separado por un punto
          //atob convierte en json  lo que esta encriptado en base 64
          
          let payload = JSON.parse(atob(response.access_token.split(".")[1]));
         console.log("DATOS AGREGADOS AL TOKEN",payload);

          this.router.navigate(['/clientes']);
          Swal.fire('Login', `Hola ${payload.user_name}, has iniciado sesión`, 'success');

      });
   }

}
