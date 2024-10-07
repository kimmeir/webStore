import { Injectable } from '@angular/core';
import { IProduct } from '../products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {}

    getUsers() {
      return this.http.get<IProduct[]>('/user')
  }
}
