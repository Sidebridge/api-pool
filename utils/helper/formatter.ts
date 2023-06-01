export function formatMoney(number: number, currency: string): string {
  return Number(number).toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
