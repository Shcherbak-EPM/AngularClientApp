import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';
import { LoggingInterceptor } from '@interceptors/logging.interceptor';
import { CacheInterceptor } from '@interceptors/cache.interceptor';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { DEFAULT_CACHE_CONFIG } from '@app/config/cache.config';
import { DEFAULT_HTTP_CLIENT_CONFIG } from '@app/config/http-client-config';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlingService } from '@services/error-handling.service';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: 'CACHE_CONFIG',
      useValue: DEFAULT_CACHE_CONFIG,
    },
    {
      provide: 'HTTP_CLIENT_CONFIG',
      useValue: DEFAULT_HTTP_CLIENT_CONFIG,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlingService,
    },
  ]
}).catch((err) => console.error(err));