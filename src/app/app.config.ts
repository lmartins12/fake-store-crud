import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products-list.page').then((m) => m.ProductsListPage),
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
