import { Routes } from '@angular/router';

export const rotasAplicacao: Routes = [

  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },

  {
    path: 'menu',
    loadComponent: () =>
      import('./menu/menu.page').then((m) => m.MenuPage)
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage)
  },

  {
    path: 'detalhe/:id',
    loadComponent: () =>
      import('./detalhe/detalhe.page').then((m) => m.DetalhePage)
  }

];