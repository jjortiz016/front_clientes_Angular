import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
          const authService = inject(AuthService);
          const router = inject(Router);
          if (authService.isAuthenticated()){
            return true;
          }
          console.log("AUTH.GUARD RETORNANDO AL LOGIN")
          router.navigate(['/login']);

          return false;

};
