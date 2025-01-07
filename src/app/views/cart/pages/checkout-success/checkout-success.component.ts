import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIcon,
    RouterLink
  ],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent {
  private currentRoute = inject(ActivatedRoute);
  public orderId = this.currentRoute.snapshot.paramMap.get('id');

  constructor() {
    console.log('CheckoutSuccessComponent', this.currentRoute.snapshot.paramMap.get('id'));
  }

  // TODO: finish success design
}
