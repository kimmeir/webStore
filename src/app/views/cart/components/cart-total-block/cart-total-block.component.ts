import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { Store } from '@ngrx/store';
import { selectCartTotalPrice } from '../../../../state/cart/cart.selectors';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart-total-block',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonComponent,
    CurrencyPipe,
    InfoBlockComponent,
    MatIcon,
  ],
  templateUrl: './cart-total-block.component.html',
  styleUrl: './cart-total-block.component.scss'
})
export class CartTotalBlockComponent {
  @Input() isButtonDisabled: boolean = false;
  @Input() buttonText!: string;
  @Output() onClick = new EventEmitter<void>();

  private store = inject(Store);
  cartTotalPrice$ = this.store.select(selectCartTotalPrice);
}
