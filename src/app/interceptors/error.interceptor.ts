// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '@services/error-handling.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private errorHandlingService: ErrorHandlingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // Delegate error handling to the service
                this.errorHandlingService.handleError(error);
                return throwError(error);
            })
        );
    }
}
