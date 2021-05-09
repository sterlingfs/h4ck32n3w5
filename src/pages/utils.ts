export function styles(...styles: string[]) {
  return styles.join(" ");
}

export function dateString(t: number) {
  return new Date(t * 1000).toLocaleString();
}
