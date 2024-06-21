
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { VoyageurService } from './voyageur.service';

export const authGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const voyageurService = inject(VoyageurService);
  const router = inject(Router);
  if (voyageurService._lognnInfo.getValue()) {
    console.log("User is authenticated, granting access.");
    return true;
  } else {
    console.log("User is not authenticated, storing redirect URL and redirecting to login.");
    // authService.setRedirectUrl(state.url);
    return router.createUrlTree(['/voyageur/se-connecter']);
  }
};