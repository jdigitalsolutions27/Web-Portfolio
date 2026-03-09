type LimitEntry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, LimitEntry>();

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt < now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  memoryStore.set(key, existing);

  return { ok: true, remaining: limit - existing.count };
}

