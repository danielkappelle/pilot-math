export function randomNumber(from: number, to: number, step: number = 1) {
  const range = (to - from) / step;
  return Math.floor(Math.random() * range) * step + from;
}

export function pad(num, n: number = 2) {
  return String(num).padStart(n, '0');
}

export function toAngle(a: number) {
  return (a + 360) % 360;
}

export function angleDiff(a: number, b: number) {
  const diff = Math.abs(a - b);
  return diff > 180 ? 360 - diff : diff;
}

export function compareAngles(a: number, b: number, tolerance: number) {
  a = (a + 360) % 360;
  b = (b + 360) % 360;
  return Math.abs(a - b) < tolerance || Math.abs(a + 360 - b) < tolerance;
}
