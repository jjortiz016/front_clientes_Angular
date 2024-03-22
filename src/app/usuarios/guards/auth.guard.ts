import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
          const authService = inject(AuthService);
          const router = inject(Router);
          if (authService.isAuthenticated()){
            console.log("se valido como usuario autenticado en authGuard")
              /*if(isTokenExpired(authService)){
                console.log("se valido como token expirado en authGuard")
                authService.logout();
                router.navigate(['/login']);
                return false;
              }*/
            return true;
          }
          console.log("AUTH.GUARD RETORNANDO AL LOGIN")
          router.navigate(['/login']);

          return false;

};

export function isTokenExpired(authService: AuthService): boolean {
      let token= authService.token;
      let payload =authService.obtenerDatosToken(token);
      let now = new Date().getTime()/1000  // como se obtiene la fecha en milisegundos de divide entre 1000 para que quede en segundos
    
      if(payload.exp < now){ // si el valor del payload es meno que la fecha actual retornamos true, el token expiro
        return true;
      }
    return false;  
}