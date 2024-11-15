import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { IProduct, ProductsService } from '../../services/requests/products';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { cartActions } from '../../state/cart/cart.actions';
import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    MatProgressBar,
    CardComponent,
    AsyncPipe,
    ProductCardComponent,
  ],
  standalone: true
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  products = this.productsService.products;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.productsService.getProducts();
  }

  onProductClick(id: any) {
    this.router.navigate(['/products', id]);
  }

  onAddToCart(product: IProduct | any) {
    const cartItem = {
      productId: product.id,
      product,
      quantity: 1
    };
    this.store.dispatch(cartActions.addTrigger(cartItem))
  }
}
