export class Message {
  thematique_id: any ;
  proposition: string = "";  
  benefice: any = null;

  private errorMessage: string = "";

  constructor() {}

  canSend(): boolean {
    this.errorMessage = "";

    // Vérification du titre
    if (!this.thematique_id ) {
      this.errorMessage = "La thématique  est requise";
      return false;
    }

    // Vérification de la description
    if (!this.proposition ) {
      this.errorMessage = "La proposition est requise";
      return false;
    }

    // Exemple : vérification du bénéfice si nécessaire
    // if (this.benefice == null) {
    //   this.errorMessage = "Le bénéfice doit être renseigné";
    //   return false;
    // }

    return true; // toutes les validations sont passées
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
