import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { IProduct } from '../../../../services/products/products.typing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    NgOptimizedImage,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    TitleCasePipe,
  ],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss'
})
export class ProductListItemComponent {
  @Input() product!: IProduct;

  constructor(private router: Router) { }

  clickHandler(id: number) {
    this.router.navigate(['/products', id]);
  }
}
