import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../../services/requests/products';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    IconButtonComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Input() isWished!: boolean;

  @Output() click = new EventEmitter<number | string>();
  @Output() onAddToCart = new EventEmitter<number | string | object>();
  @Output() onAddWish = new EventEmitter<number | string>();
  @Output() onRemoveWish = new EventEmitter<number | string>();

  onClickAddToCart(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.product);
  }

  onClickWish(event: Event) {
    event.stopPropagation();
    !this.isWished ? this.onAddWish.emit(this.product.id) : this.onRemoveWish.emit(this.product.id);
  }
}
