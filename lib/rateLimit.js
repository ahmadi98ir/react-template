const buckets = new Map();

export function rateLimit({ id, limit = 5, windowMs = 60_000 }) {
  const now = Date.now();
  const key = id;
  const b = buckets.get(key) || { reset: now + windowMs, count: 0 };
  if (now > b.reset) {
    b.reset = now + windowMs;
    b.count = 0;
  }
  b.count++;
  buckets.set(key, b);
  const remaining = Math.max(0, limit - b.count);
  return { allowed: b.count <= limit, remaining, reset: b.reset };
}

