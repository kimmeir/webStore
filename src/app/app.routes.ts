import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./views/products/products.component').then(m => m.ProductsComponent),
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./views/single-product/single-product.component').then(m => m.SingleProductComponent),
      }
    ]
  }
];
