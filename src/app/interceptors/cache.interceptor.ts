// src/app/interceptors/cache.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cacheService: CacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Cache only GET requests
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const cacheKey = req.urlWithParams;

        // Check if there is a cached response
        const cachedResponse = this.cacheService.get(cacheKey);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        // If there is no cached response, make the request and cache the response
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cacheService.set(cacheKey, event);
                }
            })
        );
    }
}
