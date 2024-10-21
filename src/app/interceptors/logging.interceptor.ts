// src/app/interceptors/logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Log the outgoing request details
        console.log(`HTTP Request: ${req.method} ${req.urlWithParams}`);
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);

        // Proceed with the request and log the response
        return next.handle(req).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        console.log(`HTTP Response: ${event.status} ${event.url}`);
                        console.log('Response Body:', event.body);
                    }
                },
                (error) => {
                    // Log the error response if any
                    console.error(`HTTP Error: ${error.status} ${error.message}`);
                }
            )
        );
    }
}
