import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from '../../../../services/requests/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    RouterLink,
    FormsModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: ICartItem;
  @Output() onRemoveFromCart = new EventEmitter<number>();
  @Output() onChangeQuantity = new EventEmitter<{ id: number | undefined, quantity: number }>();

  removeItem(event: Event) {
    event.stopPropagation();
    this.onRemoveFromCart.emit(this.item.id);
  }

  updateQuantity(event: Event) {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    if (+target.value <= 0) target.value = '1';

    this.onChangeQuantity.emit({ id: this.item.id, quantity: +target.value });
  }
}
