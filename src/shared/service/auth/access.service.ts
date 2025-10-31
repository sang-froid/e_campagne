import { Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private userRole: any;

  constructor(private locStorService: LocalStorageService) {
    // Récupérer le rôle de l'utilisateur depuis le stockage local
    this.userRole = this.locStorService.getRole()?.code;

    //console.log("user", this.userRole
        
    );
    
  }

  // Méthode pour récupérer le rôle de l'utilisateur
  getUserRole(): any {
    return this.userRole;
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  // Vérifier si l'utilisateur a l'un des rôles spécifiés
  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }
}
