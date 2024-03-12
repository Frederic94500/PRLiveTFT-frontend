import { ApiService } from '@/services/api.service';
import { ApplicationConfig } from '@angular/core';
import { AuthGuard } from '@/guards/auth.guard';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    AuthGuard,
    ApiService,
  ],
};
