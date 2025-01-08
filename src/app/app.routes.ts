import { Routes } from '@angular/router';
import { accountGuard } from './views/account/account.guard';

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
    children: [
      {
        path: '',
        loadComponent: () => import('./views/cart/pages/cart-items/cart-items.component').then(m => m.CartItemsComponent),
      },
      {
        path: 'checkout',
        canActivate: [accountGuard],
        loadComponent: () => import('./views/cart/pages/checkout/checkout.component').then(m => m.CheckoutComponent),
      },
      {
        path: 'order-success/:id',
        loadComponent: () => import('./views/cart/pages/checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent),
      }
    ]
  },
  {
    path: 'wishes',
    loadComponent: () => import('./views/wishes/wishes.component').then(m => m.WishesComponent),
  },
  {
    path: 'account',
    loadComponent: () => import('./views/account/account.component').then(m => m.AccountComponent),
    canActivate: [accountGuard],
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadComponent: () => import('./views/account/pages/orders/orders.component').then(m => m.OrdersComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./views/account/pages/orders/order-details/order-details.component').then(m => m.OrderDetailsComponent),
      },
      {
        path: 'billing',
        loadComponent: () => import('./views/account/pages/cards/cards.component').then(m => m.CardsComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./views/account/pages/settings/settings.component').then(m => m.SettingsComponent),
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./views/404/404.component').then(m => m.NotFoundComponent),
  }
];
