import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IProduct, ProductsService } from '../../services/requests/products';
import { GalleriaModule } from 'primeng/galleria';
import { Observable } from 'rxjs';
import { CartService } from '../../services/requests/cart.service';

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
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
        this.product$ = this.productsService.getProduct(this.productId);
    }
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe();
  }
}
