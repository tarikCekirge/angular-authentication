import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, RouterModule, provideRouter, withDebugTracing, withPreloading, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CommonModule, HttpClientModule, BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes)),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      // withDebugTracing(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(),
    provideAnimations(),],
};


