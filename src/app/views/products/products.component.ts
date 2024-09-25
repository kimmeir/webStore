import { Component } from '@angular/core';
import { ProductsService } from '../../services/requests/products/products.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    MatProgressBar,
    CardComponent,
  ],
  standalone: true
})
export class ProductsComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      params['categoryId']
        ? this.productsService.getProductsByCategory(params['categoryId'])
        : this.productsService.getProducts();
    });
  }

  onProductClick(id: number) {
    this.router.navigate(['/products', id]);
  }
}
