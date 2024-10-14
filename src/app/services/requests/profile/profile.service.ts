import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginForm, IToken, IUser } from './profile.typings';
import { Observable } from 'rxjs';
import { TokenService } from '../../token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public isLoginModalOpen = signal(false);
  public user: IUser | null = null;

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

  isAuthorized(): boolean {
    return Boolean(this.tokenService.getToken());
  }
}
