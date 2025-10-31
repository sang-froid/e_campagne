import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ParameterService } from '../../../shared/service/params/param';
import { Message } from '../../../shared/models/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../shared/service/storage/localstorage.service';
@Component({
  selector: 'app-propositon-form',
  standalone: true,
  imports: [
    ToastModule,
    FormsModule,
    CommonModule
  ],
  providers: [MessageService, ParameterService,LocalStorageService],

  templateUrl: './propositon-form.component.html',
  styleUrl: './propositon-form.component.scss'
})
export class PropositonFormComponent {
  constructor(
    private paramService: ParameterService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private storage: LocalStorageService
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // ← ⬆ Remonte en haut à chaque navigation
      }
    });
  }

  infoThematique: any = {};
  ngOnInit() {
    this.infoThematique = this.storage.getInfoSByUser();
    console.log("thematique", this.infoThematique);
    this.gethematique();
    this.item.thematique_id = this.infoThematique;

  }
  item: Message = new Message();
  loading: boolean = false;

  goToHome() {
    this.router.navigate(['/'])
  }

  thematiqueItems: any = [];
  gethematique() {
    this.paramService.gethematique().subscribe(
      (response: any) => {
        this.thematiqueItems = response.data;
        console.log("la réposne du webservice", response);
        this.loading = false;
      },
      (error: any) => {
        console.log("une erreur est survenu", error);
     //   this.loading = false;
      }
    )
  }

  changeThematique(){
    this.infoThematique = this.item.thematique_id;
  }
  sendProposition() {

    if (!this.item.canSend()) {
      this.messageService.add({
        severity: 'info',
        summary: '',
        detail: this.item.getErrorMessage(),
        life: 3000,
      });
      return;
    }

    this.loading = true; // active le loader
    const requestData ={
      thematique_id:this.item.thematique_id?.id,
      proposition:this.item.proposition,

    }
    this.paramService.addProposition(requestData).subscribe(
      (response: any) => {
        this.loading = false; // désactive le loader

        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Proposition envoyée avec succès !',
          life: 3000,
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      (error: any) => {
        this.loading = false; // désactive le loader

        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue, veuillez réessayer.',
          life: 3000,
        });
      }
    );
  }

 scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
