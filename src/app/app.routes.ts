import { Routes } from '@angular/router';
import { PropositonFormComponent } from './public/propositon-form/propositon-form.component';

export const routes: Routes = [




    { path: '', loadComponent: () => import('./public/home/home.component').then(m => m.HomeComponent) },

    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: 'proposition',
        component: PropositonFormComponent
    }


];
