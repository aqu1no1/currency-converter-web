export function withParams(current: URLSearchParams, changes: Record<string, string>) {
  const next = new URLSearchParams(current);
  Object.entries(changes).forEach(([key, value]) => next.set(key, value));
  return next;
}
