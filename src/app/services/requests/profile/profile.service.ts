import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginForm, IToken, IUser } from './profile.typings';
import { Observable } from 'rxjs';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getProfile(): Observable<IUser> {
    return this.http.get<IUser>('/profile')
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
