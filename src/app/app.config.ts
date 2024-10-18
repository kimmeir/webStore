import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor, jwtInterceptor, loaderInterceptor } from './services/interceptors';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { errorHandlerInterceptor } from './services/interceptors/error-handler.interceptor';
import { provideEffects } from '@ngrx/effects';
import * as profileEffect from './state/profile/profile.effects';
import * as cartEffect from './state/cart/cart.effects';
import { appState } from './state/app.state';
// import { provideApollo } from 'apollo-angular';
// import { createHttpLink, InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, errorHandlerInterceptor, jwtInterceptor, loaderInterceptor])),
    provideStore(appState),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(profileEffect, cartEffect),
  ],
};
