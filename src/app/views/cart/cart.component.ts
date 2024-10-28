import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CartTotalBlockComponent } from './components/cart-total-block/cart-total-block.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    CartTotalBlockComponent,
    RouterOutlet,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  router = inject(Router);
}
