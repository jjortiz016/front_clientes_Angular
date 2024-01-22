import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import  Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      console.log("ROLE.GUARD NO ESTA AUTENTICADO")
      return false;      
    }

    let role = next.data['role'] as string;
    console.log(role);
    if(authService.hasRole(role)){ // sie existe el role
      return true;
    }

    Swal.fire('Acceso denegado', `Hola ${authService.usuario.username} no tienes acceso a este recuros!`, 'warning' );
    router.navigate(['/clientes']);
    return false;
};
