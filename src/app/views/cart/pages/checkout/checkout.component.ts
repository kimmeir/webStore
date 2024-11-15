import { Component, computed, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { StripeService } from '../../../../services/requests/stripe.service';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Store } from '@ngrx/store';
import { selectCartTotalPrice } from '../../../../state/cart/cart.selectors';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { NewCardFormComponent } from '../../../../shared/components/new-card-form/new-card-form.component';
import { OrderService } from '../../../../services/requests/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    ButtonComponent,
    InfoBlockComponent,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    NewCardFormComponent
  ]
})
export class CheckoutComponent {
  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);
  private orderService = inject(OrderService);

  customer = this.stripeService.customer;
  methodToPay = this.orderService.paymentMethod;
  stripeAmount: number = 0;

  constructor(private store: Store) {
    this.profileService.getProfile();

    this.store.select(selectCartTotalPrice)
      .subscribe(amount => {
        this.stripeAmount = Math.round(amount * 100);
      });
  }

  paymentMethods = computed(() => [
    {
      title: 'Default card',
      value: 'default',
      isVisible: this.customer()?.metadata?.default_source !== undefined
    },
    {
      title: 'New card',
      value: 'new',
      isVisible: true
    }
  ].filter(item => item.isVisible))

  // paymentForm = this.fb.group({
  //   name: ['', [Validators.required]],
  //   email: ['', [Validators.required]],
  //   address: [''],
  //   zipcode: [''],
  //   city: [''],
  //   amount: [0, [Validators.required]]
  // });
}
