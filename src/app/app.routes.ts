import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Bachmaster } from './pages/bachmaster/bachmaster';
import { Dashboard } from './pages/dashboard/dashboard';

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
    path: 'admin',
    component: Layout,
    children: [
      {
        path: 'batchmaster',
        component: Bachmaster
      },
      {
        path:'dashboard',
        component:Dashboard
      }
    ]
  }
];
