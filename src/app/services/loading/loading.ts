import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal(false);

  start() {
    this.isLoading.set(true);
  }

  stop() {
    setTimeout(() => this.isLoading.set(false), 500);
  }
}
