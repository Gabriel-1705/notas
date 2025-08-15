export function cn(...clases: (string | undefined | null | boolean)[]): string {
  return clases.filter(Boolean).join(' ');
}