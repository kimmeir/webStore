import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { IProduct } from '../../services/products/products.typing';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    MatProgressBar,
    ProductListItemComponent,
  ],
  standalone: true
})
export class ProductsComponent {
  products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
