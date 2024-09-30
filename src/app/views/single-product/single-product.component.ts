import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/requests/products/products.service';
import { CurrencyPipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { IProduct } from '../../services/requests';
import { GalleriaModule } from 'primeng/galleria';
import { GetProductGQL, GetProductQuery } from '../../graphql/generated';

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
  product!: GetProductQuery['product'];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private getProductGQL: GetProductGQL,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProductGQL.fetch({ id: this.productId })
        .subscribe(result => this.product = result.data.product);
    }
  }

  addToCart(product: GetProductQuery['product']) {
    console.log('product', product);
  }
}
