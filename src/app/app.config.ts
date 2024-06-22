import { provideRouter } from '@angular/router';
import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PLUTO_ID } from './pluto.service';
import {
  provideNgxStripe,
} from 'ngx-stripe';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideToastr({positionClass: 'toast-top-right'}),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNgxStripe(),
    {
      provide: PLUTO_ID,
      useValue: '449f8516-791a-49ab-a09d-50f79a0678b6',
    },
  ] as unknown as EnvironmentProviders[],
};
