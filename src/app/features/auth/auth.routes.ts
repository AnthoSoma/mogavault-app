import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { provideTranslocoScope } from '@jsverse/transloco';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [AuthService],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        providers: [provideTranslocoScope('auth')],
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
