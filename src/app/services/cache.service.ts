// src/app/services/cache.service.ts
import { Injectable, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CacheConfig, CachedResponse } from '../models/cache.model';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private cache = new Map<string, CachedResponse>();

    constructor(@Inject('CACHE_CONFIG') private config: CacheConfig) { }

    get(key: string): HttpResponse<any> | undefined {
        const cached = this.cache.get(key);
        if (cached) {
            if (Date.now() < cached.expiry) {
                cached.hitCount += 1;
                if (cached.hitCount > this.config.maxHits) {
                    this.cache.delete(key);
                    console.log(`Cache for ${key} expired due to max hit count.`);
                    return undefined;
                }
                console.log(`Cache hit for ${key}.`);
                return cached.response.clone();
            } else {
                this.cache.delete(key);
                console.log(`Cache for ${key} expired due to TTL.`);
            }
        }
        return undefined;
    }

    set(key: string, response: HttpResponse<any>): void {
        if (this.cache.size >= this.config.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
                console.log(`Cache full. Deleted the oldest cache entry: ${firstKey}`);
            }
        }

        this.cache.set(key, {
            response: response.clone(),
            expiry: Date.now() + this.config.ttl,
            hitCount: 0
        });

        console.log(`Response cached for ${key} with TTL of ${this.config.ttl / 1000} seconds.`);
    }

    clear(): void {
        this.cache.clear();
        console.log('Cache cleared.');
    }
}
