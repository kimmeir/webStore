import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../../services/requests/products';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton } from '@angular/material/button';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    MatFabButton,
    IconButtonComponent,
    MatButton
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: IProduct;

  @Output() click = new EventEmitter<number | string>();
  @Output() onAddToCart = new EventEmitter<number | string | object>();

  onClickAddToCart(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.product);
  }
}
