import { Component } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { AsyncPipe } from '@angular/common';
import {
  GetAllProductsGQL,
  GetAllProductsQuery,
  GetProductsByCategoryGQL,
  GetProductsByCategoryQuery
} from '../../graphql/generated';

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
  products: GetAllProductsQuery['products'] | GetProductsByCategoryQuery['products'] | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getAllProductsGQL: GetAllProductsGQL,
    private getProductsByCategoryGQL: GetProductsByCategoryGQL,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      params['categoryId']
        ? this.getProductsByCategoryGQL.fetch({ categoryId: Number(params['categoryId']) })
          .subscribe(result => this.products = result.data.products)
        : this.getAllProductsGQL.fetch()
          .subscribe(result => this.products = result.data.products);
    });
  }

  onProductClick(id: any) {
    this.router.navigate(['/products', id]);
  }

  parseImage(image: string) {
    console.log(image);
    return image[0] === '['
      ? JSON.parse(image)[0]
      : image
  }
}
