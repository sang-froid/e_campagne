import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { DateFormatPipe } from '../../../shared/pipe/date-format.pipe';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { ParameterService } from '../../../shared/service/params/param';
import { LocalStorageService } from '../../../shared/service/storage/localstorage.service';
import { SkeletonModule } from 'primeng/skeleton';
interface NewsItem {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  duration: string;
  category: string;
  categoryLabel: string;
  actionText: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    DateFormatPipe,
    CarouselModule,
    DialogModule,
    SkeletonModule
  ],
  providers: [
    ParameterService,
    LocalStorageService
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private paramService: ParameterService,
    private router: Router,
    private storage: LocalStorageService,
  ) {

  }

  showWhySection = false;
  showSuccessMessage = false;

  propositionForm: any;

  // component.ts
  selectedNews: NewsItem | null = null;
  displayDialog: boolean = false;

  news: NewsItem[] = [
    {
      title: 'Patrice Talon réaffirme qu’il ne sera pas candidat à la présidentielle 2026',
      excerpt: 'Le président béninois a déclaré qu’il ne briguerait pas un troisième mandat en 2026, conformément à la Constitution',
      image: '../../../assets/image/image1 (1).jpeg',  // changer par une image pertinente
      date: '14 Mars 2025',
      duration: '2 min read',
      category: 'politique',
      categoryLabel: 'Politique',
      actionText: 'Lire l’article'
    },
    {
      title: 'Présidentielle 2026 au Bénin fixée au 12 avril',
      excerpt: 'La date de l’élection présidentielle a été officiellement fixée, ouvrant la campagne politique et la course à la succession',
      image: '../../../assets/image/téléchargement (7).jpeg',
      date: '25 Juillet 2025',
      duration: '3 min read',
      category: 'politique',
      categoryLabel: 'Politique',
      actionText: 'En savoir plus'
    },
    {
      title: 'Réforme de la justice : adoption de trois lois majeures',
      excerpt: 'L’Assemblée nationale du Bénin a adopté trois lois modifiant la procédure pénale et le statut des magistrats.',
      image: '../../../assets/image/close-up-judge-gavel-with-its-striking-block.jpg',
      date: '12 Mars 2025',
      duration: '4 min read',
      category: 'politique',
      categoryLabel: 'Réforme institutionnelle',
      actionText: 'Découvrir'
    },
    {
      title: 'Création d’une commission nationale pour la réforme législative',
      excerpt: 'Une nouvelle commission permanente est mise en place pour renforcer la cohérence des politiques législatives au Bénin',
      image: '../../../assets/image/image1 (1).jpeg',
      date: '15 Octobre 2025',
      duration: '3 min read',
      category: 'politique',
      categoryLabel: 'Politique',
      actionText: 'Lire'
    },
    {
      title: 'Réforme administrative : les fonctions politiques désormais éligibles à l’avancement automatique',
      excerpt: 'Un décret établit que les agents publics exerçant des fonctions politiques peuvent bénéficier d’un avancement automatique de grade et d’échelon.',
      image: '../../../assets/image/image1 (2).jpeg',
      date: '10 Avril 2025',
      duration: '3 min read',
      category: 'politique',
      categoryLabel: 'Fonction publique',
      actionText: 'Voir l’article'
    },
    {
      title: 'Refonte de la chefferie traditionnelle : vers un cadre juridique modernisé',
      excerpt: 'Une loi adoptée par l’Assemblée nationale vise à donner un cadre officiel au pouvoir des chefferies traditionnelles au Bénin.',
      image: '../../../assets/image/image1 (3).jpeg',
      date: '15 Mars 2025',
      duration: '2 min read',
      category: 'politique',
      categoryLabel: 'Culture & Politique',
      actionText: 'En savoir plus'
    }
  ];


  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '992px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];
loading: boolean = true;

  ngOnInit() {
    this.gethematique();
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

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleWhySection(event: Event): void {
    event.preventDefault();
    this.showWhySection = !this.showWhySection;

    if (this.showWhySection) {
      setTimeout(() => {
        const element = document.getElementById('whyMovementSection');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  get descriptionCount(): number {
    return this.propositionForm.get('description')?.value?.length || 0;
  }

  get benefitsCount(): number {
    return this.propositionForm.get('benefits')?.value?.length || 0;
  }

  onSubmit(): void {
    if (this.propositionForm.valid) {
      // Simulation d'envoi du formulaire
      console.log('Proposition soumise:', this.propositionForm.value);
      this.showSuccessMessage = true;
    }
  }

  newProposition(): void {
    this.showSuccessMessage = false;
    this.propositionForm.reset();
  }



  openDialog(newsItem: NewsItem) {
    this.selectedNews = newsItem;
    this.displayDialog = true;
  }

  goToFormPrpossition(item:any){
    this.storage.saveInfoByUser(item)
    this.router.navigate(['/proposition']);
  }


  getThemeColor(code: string): string {
  const colors: any = {
    EDU: '#083b72',
    SANTE: '#d83a6b',
    AGRI: '#2a9182',
    ECO: '#055d66',
    ENV: '#48a37b',
    GOUV: '#d3c6a4',
    CUL: '#c84d5c',
    DIASP: '#d15a73',
    CITOY: '#8148a2',
    INNOV: '#4593e3',
    LIBRE: '#f0a500'
  };
  return colors[code] || '#999';
}

getTextColor(code: string): string {
  const darkText: string[] = ['GOUV'];
  return darkText.includes(code) ? '#2b2b2b' : '#fff';
}

getThemeIcon(code: string): string {
  const icons: any = {
    EDU: 'pi-book',
    SANTE: 'pi-heart',
    AGRI: 'pi-leaf',
    ECO: 'pi-briefcase',
    ENV: 'pi-sun',
    GOUV: 'pi-balance-scale',
    CUL: 'pi-mask',
    DIASP: 'pi-globe',
    CITOY: 'pi-users',
    INNOV: 'pi-lightbulb',
    LIBRE: 'pi-comment'
  };
  return icons[code] || 'pi-star';
}


}
