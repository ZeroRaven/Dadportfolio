import { siteConfig } from "../config/site";

/**
 * Live clinic status from Nepal Standard Time (UTC+5:45).
 *
 * The visitor's own timezone is irrelevant — we convert "now" to the NPT
 * wall clock and check it against `siteConfig.hours`, so the Open/Closed
 * chip is correct no matter where the visitor is browsing from.
 */

export interface ClinicStatus {
  /** True inside office hours on a working day (NPT). */
  open: boolean;
  /** Current time formatted like "14:35" in NPT. */
  timeLabel: string;
}

function toNpt(now: Date): Date {
  // getTimezoneOffset() is minutes BEHIND UTC (positive west of Greenwich).
  // NPT = UTC + 345 min, so shift = visitor offset + 345.
  return new Date(now.getTime() + (now.getTimezoneOffset() + siteConfig.hours.tzOffsetMinutes) * 60000);
}

export function getClinicStatus(now: Date = new Date()): ClinicStatus {
  const npt = toNpt(now);
  const day = npt.getDay(); // 0 = Sunday … 6 = Saturday
  const minutes = npt.getHours() * 60 + npt.getMinutes();
  const { days, openMinute, closeMinute } = siteConfig.hours;

  const open = (days as readonly number[]).includes(day) && minutes >= openMinute && minutes < closeMinute;

  const hh = String(npt.getHours()).padStart(2, "0");
  const mm = String(npt.getMinutes()).padStart(2, "0");

  return { open, timeLabel: `${hh}:${mm}` };
}
