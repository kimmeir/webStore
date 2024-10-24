import { Component, Input } from '@angular/core';
import { PaymentMethod } from '@stripe/stripe-js';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-bank-card',
  standalone: true,
  imports: [
    IconButtonComponent,
    MatIcon
  ],
  templateUrl: './bank-card.component.html',
  styleUrl: './bank-card.component.scss'
})
export class BankCardComponent {
  @Input() cardItem!: PaymentMethod;
}
