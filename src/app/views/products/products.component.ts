import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { IProduct, ProductsService } from '../../services/requests/products';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { cartActions } from '../../state/cart/cart.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    MatProgressBar,
    CardComponent,
    AsyncPipe,
  ],
  standalone: true
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  products$: Observable<IProduct[]> = this.productsService.getProducts();

  constructor(
    private router: Router,
    private store: Store,
  ) {
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
    // this.profileService.isAuthorized()
    //   ? this.cartService.addToCart(cartItem).subscribe()
    //   : this.store.dispatch(cartActions.add(cartItem))
  }
}
