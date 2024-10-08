import { Routes } from '@angular/router';
import { profileGuard } from './views/profile/profile.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () => import('./views/products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./views/single-product/single-product.component').then(m => m.SingleProductComponent),
      }
    ]
  },
  {
    path: 'categories',
    loadComponent: () => import('./views/categories/categories.component').then(m => m.CategoriesComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./views/cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./views/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [profileGuard]
  }
];
