import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor, jwtInterceptor, loaderInterceptor } from './services/interceptors';
// import { provideApollo } from 'apollo-angular';
// import { createHttpLink, InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, jwtInterceptor, loaderInterceptor])
    ),
    // provideApollo(() => {
    //   return {
    //     link: createHttpLink({ uri: 'https://api.escuelajs.co/graphql' }),
    //     cache: new InMemoryCache(),
    //   };
    // }),
  ],
};
