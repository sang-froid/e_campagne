/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomHttpInterceptor } from './shared/service/intercepteur/intercepteur';

bootstrapApplication(AppComponent, {

  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(),
   // provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    
  ]

});