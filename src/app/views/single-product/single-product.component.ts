import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/requests/products/products.service';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IProduct } from '../../services/requests';
import { GalleriaModule } from 'primeng/galleria';

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
  product$!: IProduct;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(Number(this.productId))
      .subscribe((product: IProduct) => {
        this.product$ = product;
      });
  }

  addToCart(product: IProduct) {
    console.log('product', product);
  }
}
