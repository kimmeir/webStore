import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../../services/requests/profile/profile.service';
import { StripeService } from '../../../../services/requests/stripe.service';
import { BankCardComponent } from './components/bank-card/bank-card.component';
import { InfoBlockComponent } from '../../../../shared/components/info-block/info-block.component';
import { MatIcon } from '@angular/material/icon';
import { BasicButtonComponent } from '../../../../shared/components/basic-button/basic-button.component';
import { MatDialog } from '@angular/material/dialog';
import { NewCardDialogComponent } from './components/new-card-dialog/new-card-dialog.component';
import { AddressBlockComponent } from './components/address-block/address-block.component';

@Component({
  selector: 'app-existing-stripe-cards',
  standalone: true,
  imports: [
    BankCardComponent,
    InfoBlockComponent,
    MatIcon,
    BasicButtonComponent,
    AddressBlockComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {

  private profileService = inject(ProfileService);
  private stripeService = inject(StripeService);
  private dialog = inject(MatDialog);

  user = this.profileService.user;
  cards = this.stripeService.cards;
  customer = this.stripeService.customer;


  constructor() {
    this.stripeService.getPaymentMethods()
  }

  addCard() {
    this.dialog.open(NewCardDialogComponent, {
      width: '400px',
    });
  }
}
