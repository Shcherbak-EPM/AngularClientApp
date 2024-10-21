// src/app/services/logger.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private logSubject = new Subject<string>();

    constructor() {
        this.logSubject.subscribe(message => {
            console.log(`[LOG]: ${message}`);
        });
    }

    log(message: string) {
        const timestamp = new Date().toISOString();
        this.logSubject.next(`${timestamp} - ${message}`);
    }

    getLogObservable(): Observable<string> {
        return this.logSubject.asObservable();
    }
}
