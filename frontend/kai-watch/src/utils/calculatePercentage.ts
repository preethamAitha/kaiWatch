export function calculatePercentage(num1?: number, num2?: number): string {
  if (!num1 || !num2 || num2 === 0) {
    return "+0%";
  }

  const difference = num2 - num1;
  const percentChange = (difference / num1) * 100;

  const sign = percentChange >= 0 ? "+" : "";
  return `${sign}${percentChange.toFixed(1)}%`;
}
