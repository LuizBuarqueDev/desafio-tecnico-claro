import { Routes } from '@angular/router';
import { authGuard } from './http/services/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then((m) => m.AuthPage),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('@shared/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/orders/order.page').then((m) => m.OrderPage),
      },
      {
        path: 'order-create',
        loadComponent: () =>
          import('./pages/order-create/order-create.page').then((m) => m.OrderCreatePage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
