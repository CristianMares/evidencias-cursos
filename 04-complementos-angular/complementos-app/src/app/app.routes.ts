import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ciclo-de-vida',
    loadComponent: () => import('./pages/lifecycle/lifecycle-page.component'),
  },
  {
    path: 'formulario',
    loadComponent: () => import('./pages/reactive-form/reactive-form-page.component'),
  },
  {
    path: 'mapa',
    loadComponent: () => import('./pages/map/map-page.component'),
  },
  {
    path: '**',
    redirectTo: 'ciclo-de-vida',
  },
];
