import { createAction, createActionGroup } from '@ngrx/store';
import { IWishItem } from '../../services/requests/wishes.service';

export const wishesActions = createActionGroup({
  source: 'Wishes',
  events: {
    loadToWishes: (wishItems: IWishItem[]) => ({ wishItems }),
    add: (productId: number | string) => ({ productId }),
    remove: (productId: string | number) => ({ productId }),
  },
})

export const wishesTrigger = createAction('[Wishes] Trigger');
export const wishesClear = createAction('[Wishes] Logout Trigger');
