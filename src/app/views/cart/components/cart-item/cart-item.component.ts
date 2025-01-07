import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICartItem } from '../../../../services/requests/cart.service';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatIcon,
    MatIconButton,
    RouterLink,
    InputNumberModule,
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
    this.onChangeQuantity.emit({ id: this.item.id, quantity: +target.value });
    console.log('update quantity', target.value);
  }
}
