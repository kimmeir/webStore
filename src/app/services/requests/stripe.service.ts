import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  key = 'pk_test_51IP0R5In4Fj56JUNDVbWFsd0OLr2Wt9UytD80lDEMOGA7LsxTK7SG1XA5lcudzNV4j61jL4TLGDEFLDcHk8RNE9s00d7LQAI1E'
  cards = signal<PaymentMethod[]>([]);

  constructor(private http: HttpClient) {
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
}
