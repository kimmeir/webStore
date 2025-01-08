import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, tap } from 'rxjs';
import { loadStripe, PaymentIntent, PaymentMethod, Stripe, StripeCardNumberElement } from '@stripe/stripe-js';
import { IUser } from './profile/profile.typings';

export interface StripeCustomer {
  id: string;
  metadata: {
    default_source: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  key = 'pk_test_51IP0R5In4Fj56JUNDVbWFsd0OLr2Wt9UytD80lDEMOGA7LsxTK7SG1XA5lcudzNV4j61jL4TLGDEFLDcHk8RNE9s00d7LQAI1E'
  cards = signal<PaymentMethod[]>([]);
  customer = signal<StripeCustomer | null>(null);
  stripe = signal<Stripe | null>(null);
  cardNumberElement: StripeCardNumberElement | null = null;

  constructor(
    private http: HttpClient,
  ) {
    this.initStripe();
  }

  initStripe(): void {
    from(loadStripe(this.key))
      .subscribe(stripe => this.stripe.set(stripe));
  }

  getCustomer(stripeId: string): void {
    this.http.get<StripeCustomer>(`/stripe-customer`, { params: { stripeId } })
      .subscribe((customer) => this.customer.set(customer));
  }

  createCustomer(): Observable<IUser> {
    return this.http.post<IUser>('/stripe-customer', {});
  }

  createPaymentIntent(data: { amount: number, currency: string }): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>('/stripe-checkout', data);
  }

  createPaymentMethod(): Observable<any> {
    return from(this.stripe()!.createPaymentMethod({
      type: 'card',
      card: this.cardNumberElement!,
    }))
  }

  createCustomerPaymentMethod(data: { paymentMethodId?: string, stripeId?: string }): Observable<any> {
    return this.http.post('/stripe-payment-method', data);
  }

  getPaymentMethods(): void {
    this.http.get<PaymentMethod[]>('/stripe-payment-method')
      .subscribe(cards => this.cards.set(cards));
  }

  setDefaultCard(paymentMethodId: string): void {
    this.http.post<StripeCustomer>('/stripe-default-card', { paymentMethodId })
      .pipe(
        tap((customer) => this.customer.set(customer)),
      )
      .subscribe();
  }
}
