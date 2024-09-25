import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ɵFormGroupValue, ɵTypedOrUntyped } from '@angular/forms';
import { IToken, IUser } from './profile.typings';
import { Observable, Subscription } from 'rxjs';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public user: IUser | null = null;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  getProfile(): Subscription {
    return this.http.get<IUser>('/auth/profile')
      .subscribe((res) => this.user = res);
  }

  login(loginForm: ɵTypedOrUntyped<{
    password: FormControl<string | null>;
    email: FormControl<string | null>
  }, ɵFormGroupValue<{ password: FormControl<string | null>; email: FormControl<string | null> }>, any>): Observable<IToken> {
    return this.http.post<IToken>('/auth/login', loginForm);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  isAuthorized(): boolean {
    return Boolean(this.tokenService.getToken());
  }
}