import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../../../state/cart/cart.selectors';
import { cartActions, cartTriggerAction } from '../../../../state/cart/cart.actions';
import { CartTotalBlockComponent } from '../../components/cart-total-block/cart-total-block.component';
import { AuthDialogComponent } from '../../../../layouts/header/components/auth-dialog/auth-dialog.component';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [
    AsyncPipe,
    CartItemComponent,
    InfoBlockComponent,
    NgIf,
    CartTotalBlockComponent,
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.scss'
})
export class CartItemsComponent {
  private profileService = inject(ProfileService);
  private router = inject(Router);
  private dialogRef = inject(MatDialog);
  private store = inject(Store);
  public cart$ = this.store.select(selectCartItems);

  constructor() {
    this.store.dispatch(cartTriggerAction())
  }

  onRemoveFromCart(cartItemId: string | number) {
    this.store.dispatch(cartActions.removeTrigger(cartItemId));
  }

  onChangeQuantity({ id, quantity }: { id: number | undefined, quantity: number }) {
    if (!id) return;
    this.store.dispatch(cartActions.changeQuantity(id, quantity));
  }

  onProceedToCheckout() {
    this.profileService.isAuthorized()
      ? this.router.navigate(['cart', 'checkout'])
      : this.dialogRef.open(AuthDialogComponent, {
        width: '400px',
      });
  }
}
