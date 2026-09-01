import { Routes } from '@angular/router';

// Components
import { AdminLayoutComponent } from './domains/admin/component/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './domains/auth/components/auth-layout/auth-layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

import { canActivateGuard, canMatchGuard } from "@auth/guards/auth.guard";


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component')
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./domains/products/pages/product-detail/product-detail.component')
      },
      {
        path: 'cart',
        loadComponent: () => import('./domains/products/pages/cart/cart.component')
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        loadComponent: () => import('./domains/auth/pages/register/register.component')
      },
      {
        path: 'login',
        loadComponent: () => import('./domains/auth/pages/login/login.component')
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [canActivateGuard],
    canMatch: [ canMatchGuard ],
    children: [
      {
        path: 'products',
        loadComponent: () => import('./domains/admin/pages/products/products.component')
      },
      {
        path: 'categories',
        loadComponent: () => import('./domains/admin/pages/categories/categories.component')
      },
      {
        path: 'create',
        loadComponent: () => import('./domains/products/pages/form/form.component')
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./domains/products/pages/form/form.component')
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
