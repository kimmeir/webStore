import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, tap } from 'rxjs';
import { loadStripe, PaymentIntent, PaymentMethod, Stripe } from '@stripe/stripe-js';

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
  pi_secret = signal<string | null>(null);

  constructor(private http: HttpClient) {
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

  createPaymentIntent(data: { amount: number, currency: string }): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>('/stripe-checkout', data);
  }

  createPaymentMethod(data: { paymentMethodId?: string, stripeId?: string }): Observable<any> {
    return this.http.post('/stripe-payment-method', data);
  }

  getPaymentMethods(stripeId: string): void {
    this.http.get<PaymentMethod[]>('/stripe-payment-method', { params: { stripeId } })
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
