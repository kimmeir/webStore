import { Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { IProduct, ProductsService } from '../../services/requests/products';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../services/requests/cart.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // this.route.queryParams.subscribe((params) => {
      // params['categoryId']
        // ? this.productsService.getProductsByCategory(Number(params['categoryId']))
  }

  onProductClick(id: any) {
    this.router.navigate(['/products', id]);
  }

  onAddToCart(product: IProduct | any) {
    this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe();
  }
}
