import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginForm, IToken, IUser } from './profile.typings';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../../token.service';
import { StripeService } from '../stripe.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user = signal<IUser | null>(null);
  stripeService = inject(StripeService);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getProfile(): void {
    this.http.get<IUser>('/profile')
      .pipe(
        tap((user: IUser) => {
          if (user?.stripeId)
            this.stripeService.getCustomer(user.stripeId)
        })
      )
      .subscribe((user: IUser) => this.user.set(user));
  }

  login(loginForm: ILoginForm): Observable<IToken> {
    return this.http.post<IToken>('/auth/login', loginForm);
  }

  signUp(signUpForm: ILoginForm): Observable<IToken> {
    return this.http.post<IToken>('/auth/registration', signUpForm);
  }

  isAuthorized(): boolean {
    return Boolean(this.tokenService.getToken());
  }
}
