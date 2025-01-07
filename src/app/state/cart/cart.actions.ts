import { createAction, createActionGroup } from '@ngrx/store';
import { ICartItem } from '../../services/requests/cart.service';

export const cartActions = createActionGroup({
  source: 'Cart',
  events: {
    add: (product: ICartItem) => ({ product }),
    addTrigger: (product: ICartItem) => ({ product }),
    remove: (cartItemId: string | number) => ({ cartItemId }),
    removeTrigger: (cartItemId: string | number) => ({ cartItemId }),
    changeQuantity: (cartItemId: string | number, quantity: number) => ({ cartItemId, quantity }),
    loadCartOnLogin: (cartItems: ICartItem[]) => ({ cartItems }),
    loadToCart: (cartItems: ICartItem[]) => ({ cartItems }),
  },
})

export const cartTriggerAction = createAction('[Cart] Trigger');
export const cartClear = createAction('[Cart] Logout Trigger');
