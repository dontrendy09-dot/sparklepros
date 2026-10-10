/**
 * Sliding-window rate limiter kept in memory.
 *
 * On serverless platforms each running instance keeps its own window, so this
 * is a first line of defence against floods rather than a global quota. For a
 * strict global limit, back it with a shared store such as Upstash Redis.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return {
    check(key: string, now: number = Date.now()) {
      const windowStart = now - windowMs;
      const recent = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);

      if (recent.length >= limit) {
        hits.set(key, recent);
        const oldest = recent[0] ?? now;
        return { ok: false as const, retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
      }

      recent.push(now);
      hits.set(key, recent);

      // Keep memory bounded on long-lived instances.
      if (hits.size > 5_000) {
        for (const [storedKey, timestamps] of hits) {
          if (timestamps.every((timestamp) => timestamp <= windowStart)) hits.delete(storedKey);
        }
      }

      return { ok: true as const, remaining: limit - recent.length };
    },
  };
}
