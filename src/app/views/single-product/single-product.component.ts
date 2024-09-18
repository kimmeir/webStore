import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../services/products/products.typing';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-single-product',
  standalone: true,
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss',
  imports: [
    JsonPipe
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
}
