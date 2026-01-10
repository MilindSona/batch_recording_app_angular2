import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Bachmaster } from './pages/bachmaster/bachmaster';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';
import { Candidates } from './pages/candidates/candidates';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'batch',
        component: Bachmaster
      },
      {
        path:'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
      },
      {
        path:'candidate',
        component:Candidates
      }
    ]
  }
];
