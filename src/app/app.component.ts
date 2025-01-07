import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { MainComponent } from './layouts/main/main.component';
import { ProfileService } from './services/requests/profile/profile.service';
import { Store } from '@ngrx/store';
import { cartTriggerAction } from './state/cart/cart.actions';
import { wishesTrigger } from './state/wishes/wishes.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private store: Store
  ) {
  }

  ngOnInit() {
    if (this.profileService.isAuthorized()) {
      this.store.dispatch(cartTriggerAction());
      this.store.dispatch(wishesTrigger());
    }
  }
}
