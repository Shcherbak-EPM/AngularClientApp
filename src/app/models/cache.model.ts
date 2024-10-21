// src/app/models/cache.model.ts

import { HttpResponse } from '@angular/common/http';

export interface CacheConfig {
    maxCacheSize: number;
    ttl: number;
    maxHits: number;
}

export interface CachedResponse {
    response: HttpResponse<any>;
    expiry: number;
    hitCount: number;
}
