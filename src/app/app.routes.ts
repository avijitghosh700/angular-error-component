import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'book/:id',
    loadComponent: () =>
      import('./pages/details/details.component').then((m) => m.DetailsComponent),
  },
  {
    path: 'author/:id',
    loadComponent: () =>
      import('./pages/author/author.component').then((m) => m.AuthorComponent),
  },
];
