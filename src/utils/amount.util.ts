const AMOUNT_PATTERN = /^\d+(\.\d+)?$/;

export function parseAmount(text: string): string | null {
  const normalized = text.trim().replace(',', '.');
  return AMOUNT_PATTERN.test(normalized) ? normalized : null;
}
