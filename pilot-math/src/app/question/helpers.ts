export function randomNumber(from: number, to: number, step: number = 1) {
  const range = (to - from) / step;
  return Math.floor(Math.random() * range) * step + from;
}

export function pad(num, n: number = 2) {
  return String(num).padStart(n, '0');
}
