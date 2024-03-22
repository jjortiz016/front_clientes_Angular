import { Component } from "@angular/core";
import { AuthService } from "../usuarios/auth.service";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    constructor(public authService: AuthService, private router: Router){
           
    }

    logout(): void{
        let username = this.authService.usuario.username; //se asigna a la variable ya que el logout la deja en null
        this.authService.logout();
        
        Swal.fire('Logout', `Hola ${username}, has cerrado sesión`, 'success');
        this.router.navigate(['/login']);
    }
}