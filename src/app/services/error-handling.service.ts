// src/app/services/error-handling.service.ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {
    handleError(error: HttpErrorResponse | Error): void {
        if (error instanceof HttpErrorResponse) {
            // Handle HTTP error
            console.error(`HTTP Error: ${error.status} - ${error.message}`);
            switch (error.status) {
                case 404:
                    console.error('Not Found');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error('An unexpected error occurred');
            }
        } else {
            // Handle client-side error
            console.error(`Client Error: ${error.message}`);
        }
    }
}
