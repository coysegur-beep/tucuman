const TZ = "America/Argentina/Buenos_Aires";
const FOUNDED_AT = new Date("2026-05-05T00:00:00-03:00");

const longDateFmt = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TZ,
});

const shortDateFmt = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "short",
  timeZone: TZ,
});

const timeFmt = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TZ,
});

const numberFmt = new Intl.NumberFormat("es-AR");

export function formatLongDate(date: Date | string = new Date()): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const out = longDateFmt.format(d);
  return out.charAt(0).toUpperCase() + out.slice(1);
}

export function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return shortDateFmt.format(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return timeFmt.format(d);
}

export function formatRelative(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60_000);

  if (diffMin < 1) return "ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `hace ${diffHours} h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "ayer";
  if (diffDays < 7) return `hace ${diffDays} d`;
  return formatShortDate(then);
}

export function editionNumber(date: Date = new Date()): string {
  const days = Math.max(
    1,
    Math.floor((date.getTime() - FOUNDED_AT.getTime()) / 86_400_000) + 1,
  );
  return numberFmt.format(days);
}
