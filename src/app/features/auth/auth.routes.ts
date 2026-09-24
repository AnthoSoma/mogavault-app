import { Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    providers: [AuthService],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
