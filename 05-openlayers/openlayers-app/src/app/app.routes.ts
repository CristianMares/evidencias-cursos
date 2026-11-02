import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vista-de-inicio',
    loadComponent: () => import('./pages/vista-de-inicio/vista-de-inicio-page.component'),
  },
  {
    path: 'controles',
    loadComponent: () => import('./pages/controles/controles-page.component'),
  },
  {
    path: 'raster',
    loadComponent: () => import('./pages/raster/raster-page.component'),
  },
  {
    path: 'vectores',
    loadComponent: () => import('./pages/vectores/vectores-page.component'),
  },
  {
    path: '**',
    redirectTo: 'vista-de-inicio',
  },
];
