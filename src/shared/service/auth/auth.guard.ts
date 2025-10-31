import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    //console.log("this.authService.isLoggedIn())",this.authService.isLoggedIn());
    
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Rediriger vers la page de connexion si non authentifié
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
