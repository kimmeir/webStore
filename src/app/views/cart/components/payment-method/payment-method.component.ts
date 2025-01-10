import { Component, computed, inject } from '@angular/core';
import { StripeService } from '../../../../services/requests/stripe.service';
import { OrderService } from '../../../../services/requests/order.service';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { NewCardFormComponent } from '../../../../shared/components/new-card-form/new-card-form.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
  standalone: true,
  imports: [
    InfoBlockComponent,
    MatRadioGroup,
    MatRadioButton,
    NewCardFormComponent
  ]
})
export class PaymentMethodComponent {
  private stripeService = inject(StripeService);
  private orderService = inject(OrderService);

  customer = this.stripeService.customer;
  methodToPay = this.orderService.paymentMethod;
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
}
