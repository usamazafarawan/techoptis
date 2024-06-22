import { provideRouter } from '@angular/router';
import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxStripeModule } from 'ngx-stripe';
export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule,NgxStripeModule.forRoot('pk_test_51PUN6OIcTsPq2p4JphmTadz9Re7mh2wR0cCaMMiPGOi4iHzwBhSqeUu0uikbiEdNDAvtXUDPf8a6mwT6XYBKcUaV00J9cOe7Xk')),
    provideRouter(routes),
    provideToastr({positionClass: 'toast-top-right'}),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync()
  ] as unknown as EnvironmentProviders[],
};
