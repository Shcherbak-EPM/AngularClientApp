// src/app/config/cache.config.ts

import { CacheConfig } from '../models/cache.model';

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
    maxCacheSize: 100,
    ttl: 60000, // 60 seconds
    maxHits: 5,
};
