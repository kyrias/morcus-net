export function macronizeCall(): string {
  return `/api/macronize/`;
}

export function lsCall(entry: string): string {
  return `/api/dicts/ls/${entry}`;
}