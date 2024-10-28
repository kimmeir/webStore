import { Component, inject, Input } from '@angular/core';
import { PaymentMethod } from '@stripe/stripe-js';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { StripeService } from '../../../../../../services/requests/stripe.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [
    IconButtonComponent,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    NgIf
  ],
  templateUrl: './bank-card.component.html',
  styleUrl: './bank-card.component.scss'
})
export class BankCardComponent {
  @Input() cardItem!: PaymentMethod;
  @Input() defaultCard?: string;

  stripeService = inject(StripeService);

  setAsDefault() {
    this.stripeService.setDefaultCard(this.cardItem.id);
  }

  deleteCard() {
    // TODO: implement deleting card from payment list
    console.log('Delete card', this.cardItem);
  }
}
