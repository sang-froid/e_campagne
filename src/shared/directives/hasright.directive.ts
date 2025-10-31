import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { LocalStorageService } from "../service/storage/localstorage.service";

@Directive({
  selector: '[hasRight]'
})
export class HasRightDirective implements OnInit {
  @Input('hasRight') requiredRights: string[] = [];

  private connUser: any;
  private rightsList: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private localStorage: LocalStorageService
  ) {}

 ngOnInit(): void {
  this.connUser = this.localStorage.getUsers();
  //console.log("user", this.connUser.responsibilities);

  // Extraire tous les droits actifs à partir de toutes les responsabilités
  const responsibRights = this.connUser?.responsibilities
    ?.flatMap((resp: any) => resp.responsibility?.responsib_rights || []);

  //console.log("Tous les droits (bruts)", responsibRights);

  this.rightsList = responsibRights
    .filter((r: any) => r.is_actif && r.right?.code)
    .map((r: any) => r.right.code.toLowerCase().trim());

  //console.log( Droits actifs de l\'utilisateur connecté :', this.rightsList);

  const hasRight = this.requiredRights.some(d => 
    this.rightsList.includes(d.toLowerCase().trim())
  );

  if (hasRight) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainer.clear();
  }
}

}

