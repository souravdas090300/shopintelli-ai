export function formatPrice(value: unknown, opts: Intl.NumberFormatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 }) {
  const n = Number(value ?? 0);
  if (!isFinite(n)) return '$0.00';
  return `$${n.toLocaleString('en-US', opts)}`;
}

export function formatNumber(value: unknown, opts: Intl.NumberFormatOptions = {}) {
  const n = Number(value ?? 0);
  if (!isFinite(n)) return '0';
  return n.toLocaleString('en-US', opts);
}
