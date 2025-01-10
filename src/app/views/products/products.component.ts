import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductsService } from '../../services/requests/products';
import { Store } from '@ngrx/store';
import { cartActions } from '../../state/cart/cart.actions';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AuthDialogComponent } from '../../layouts/header/components/auth-dialog/auth-dialog.component';
import { ProfileService } from '../../services/requests/profile/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { wishesActions } from '../../state/wishes/wishes.actions';
import { selectWishListItems } from '../../state/wishes/wishes.selectors';
import { IWishItem } from '../../services/requests/wishes.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    ProductCardComponent,
  ],
  standalone: true
})
export class ProductsComponent {
  private store = inject(Store);
  private router = inject(Router);
  productsService = inject(ProductsService);
  products = this.productsService.products;
  private profileService = inject(ProfileService);
  private dialog = inject(MatDialog);
  wishes: IWishItem[] = [];
  wishes$ = this.store.select(selectWishListItems);

  constructor() {
    this.productsService.getProducts();
    this.store.select(selectWishListItems).subscribe((wishes) => {
      this.wishes = wishes;
    });
  }

  onProductClick(id: any) {
    this.router.navigate(['/products', id]);
  }

  onAddToCart(product: IProduct | any) {
    const cartItem = {
      productId: product.id,
      product,
      quantity: 1
    };
    this.store.dispatch(cartActions.addTrigger(cartItem))
  }

  onAddToWishlist(productId: number | string) {
    if (!this.profileService.isAuthorized())
      this.dialog.open(AuthDialogComponent, {
        width: '400px',
      });
    else
      this.store.dispatch(wishesActions.add(productId));
  }

  onRemoveFromWishlist(productId: number | string) {
    this.store.dispatch(wishesActions.remove(productId));
  }

  isWished(productId: any) {
    return !!this.wishes.find(wish => wish.product.id === productId);
  }
}
