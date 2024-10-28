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

  removeItem(event: Event) {
    event.stopPropagation();
    this.onRemoveFromCart.emit(this.item.id);
  }

  // TODO: add possibility to change quantity of product by input change event or add button that will update cart
}
