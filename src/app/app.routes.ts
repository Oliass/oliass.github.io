import { Routes } from '@angular/router';

export const routes: Routes = [  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
        return import('./home/home').then((m => m.Home))
    },
  },
  {
    path: 'grades',
    loadComponent: () => {
        return import('./grades/grades').then ((m => m.Grades))
    }
  },

  {
    path: 'quiz',
    loadComponent: () => {
        return import('./quiz/quiz').then ((m => m.Quiz))
    }
  },

  {
    path: 'dashboard',
    loadComponent: () => {
        return import('./dashboard/dashboard').then ((m => m.Dashboard))
    }
  },
  {
    path: 'extra',
    loadComponent: () => {
        return import('./extra-curr/extra-curr').then ((m => m.ExtraCurr))
    }
  },
];
