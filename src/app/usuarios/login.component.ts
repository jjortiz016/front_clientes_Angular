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
          //atob convierte en json string  lo que esta encriptado en base 64
          
         // let payload = JSON.parse(atob(response.access_token.split(".")[1]));
        // console.log("DATOS AGREGADOS AL TOKEN",payload);
        
        this.authservice.guardarUsuario(response.access_token);
        this.authservice.guardarToken(response.access_token);
        let usuario= this.authservice.usuario; //lo trae el metodo get aunque paresca que es el atributo
          this.router.navigate(['/clientes']);
          Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión`, 'success');

      }, err => {
          if(err.status == 400){
            Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
          }
      }
      
      );
   }

}
