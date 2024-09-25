import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = false;

  start() {
    this.loading = true;
  }

  stop() {
    setTimeout(() => this.loading = false, 1000);
  }

  isLoading() {
    return this.loading;
  }
}
