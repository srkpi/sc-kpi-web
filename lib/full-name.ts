export const fullName = (...parts: (string | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');
