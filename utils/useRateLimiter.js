const requestLog = new Map();

export async function useRateLimiter(req, limit = 5, windowMs = 60 * 1000) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("remote-addr") ||
    "unknown";

  const currentTime = Date.now();

  if (!requestLog.has(ip)) {
    requestLog.set(ip, { count: 1, lastRequest: currentTime });
    return { isRateLimited: false };
  }

  const log = requestLog.get(ip);
  const timeDifference = currentTime - log.lastRequest;

  if (timeDifference < windowMs) {
    if (log.count >= limit) {
      return {
        isRateLimited: true,
      };
    } else {
      log.count++;
      requestLog.set(ip, log);
      return { isRateLimited: false };
    }
  } else {
    requestLog.set(ip, { count: 1, lastRequest: currentTime });
    return { isRateLimited: false };
  }
}
