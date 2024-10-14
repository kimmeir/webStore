import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IProduct, ProductsService } from '../../services/requests/products';
import { GalleriaModule } from 'primeng/galleria';
import { Observable } from 'rxjs';
import { cartActions } from '../../state/cart/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-single-product',
  standalone: true,
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
  imports: [
    JsonPipe,
    CurrencyPipe,
    MatButton,
    GalleriaModule,
    NgOptimizedImage
  ],
})
export class SingleProductComponent {
  productId: string | null = null;
  product$: Observable<IProduct> | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.product$ = this.productsService.getProduct(this.productId);
    }
  }

  addToCart(product: IProduct) {
    const cartItem = {
      productId: product.id,
      product,
      quantity: 1
    };

    this.store.dispatch(cartActions.addTrigger(cartItem))
  }
}
