import { Component, inject } from '@angular/core';
import { InfoBlockComponent } from '../../../../../../shared/components/info-block/info-block.component';
import { MatIcon } from '@angular/material/icon';
import { Stripe } from '@stripe/stripe-js';
import { StripeService } from '../../../../../../services/requests/stripe.service';
import { ProfileService } from '../../../../../../services/requests/profile/profile.service';
import { ButtonComponent } from '../../../../../../shared/components/button/button.component';
import { MatDialog } from '@angular/material/dialog';
import { iif, of, switchMap, tap } from 'rxjs';
import { NewCardFormComponent } from '../../../../../../shared/components/new-card-form/new-card-form.component';

@Component({
  selector: 'app-new-card-dialog',
  standalone: true,
  imports: [
    InfoBlockComponent,
    MatIcon,
    ButtonComponent,
    NewCardFormComponent
  ],
  templateUrl: './new-card-dialog.component.html',
  styleUrl: './new-card-dialog.component.scss'
})
export class NewCardDialogComponent {
  private stripeService = inject(StripeService);
  private profileService = inject(ProfileService);
  private dialog = inject(MatDialog);

  stripe: Stripe | null = null;
  user = this.profileService.user;

  async ngOnInit() {
    this.stripe = this.stripeService.stripe();
  }

  createCard() {
    if (!this.stripeService.cardNumberElement) return;
    iif(
      () => !!this.user()?.stripeId,
      of(this.user()),
      this.stripeService.createCustomer()
    ).pipe(
      tap((user) => this.user.set(user)),
      switchMap(() => this.stripeService.createPaymentMethod()),
      switchMap((result) => this.stripeService.createCustomerPaymentMethod({
        stripeId: this.user()?.stripeId,
        paymentMethodId: result.paymentMethod?.id
      })),
      tap(() => this.stripeService.getPaymentMethods()),
      tap(() => this.close())
    )
      .subscribe()
  }

  close() {
    this.dialog.closeAll();
  }
}
