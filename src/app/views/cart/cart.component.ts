import { Component, inject } from '@angular/core';
import { CartService } from '../../services/requests/cart.service';
import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CurrencyPipe,
    MatIcon,
    NgIf,
    MatIconButton,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
  cart$ = this.cartService.cartItems;

  constructor() {
    this.cartService.getCart()
  }

  onRemoveFromCart(event: Event, id: number) {
    event.stopPropagation();
    this.cartService.removeFromCart(id)
      .pipe(
        switchMap(async () => this.cartService.getCart())
      )
      .subscribe();
  }
}
