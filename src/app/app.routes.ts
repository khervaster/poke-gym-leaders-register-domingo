import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    title: 'Home - Gym Leader Registry',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent) 
  },
  { 
    path: 'leaders', 
    title: 'Leaders - Gym Leader Registry',
    loadComponent: () => import('./components/leader-list/leader-list').then(m => m.LeaderList) 
  },
  { 
    path: 'leaders/new', 
    title: 'Add Leader - Gym Leader Registry',
    loadComponent: () => import('./components/leader-form/leader-form').then(m => m.LeaderForm) 
  },
  { 
    path: 'leaders/:id/edit', 
    title: 'Edit Leader - Gym Leader Registry',
    loadComponent: () => import('./components/leader-form/leader-form').then(m => m.LeaderForm) 
  },
  { 
    path: '**', 
    title: 'Page Not Found',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound) 
  }
];