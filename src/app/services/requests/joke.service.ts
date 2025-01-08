import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JokeService {
  constructor(private http: HttpClient) {
  }

  getJoke(): Observable<string> {
    return this.http.get<string>('/joke')
  }

  getImage(): Observable<{ image: string }> {
    return this.http.get<{ image: string }>('/image')
  }
}
