import { provideRouter } from '@angular/router';
import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideToastr({positionClass: 'toast-top-right'}),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync()
  ] as unknown as EnvironmentProviders[],
};
