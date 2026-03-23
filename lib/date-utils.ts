import type { SendDay } from "@/lib/types";

const dayMap: Record<SendDay, number> = {
  Monday: 1,
  Thursday: 4
};

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function formatDateLabel(value: string): string {
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    weekday: "short"
  }).format(date);
}

export function formatDateTimeLabel(value: string): string {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function getNextSendDate(day: SendDay, from = new Date()): string {
  const target = dayMap[day];
  const copy = new Date(from);
  copy.setHours(12, 0, 0, 0);
  const diff = (target - copy.getDay() + 7) % 7 || 7;
  copy.setDate(copy.getDate() + diff);
  return toIsoDate(copy);
}

export function getSendDatesForMonth(monthKey: string): string[] {
  const [yearRaw, monthRaw] = monthKey.split("-");
  const year = Number(yearRaw);
  const monthIndex = Number(monthRaw) - 1;

  if (Number.isNaN(year) || Number.isNaN(monthIndex)) {
    return [];
  }

  const values: string[] = [];
  const cursor = new Date(year, monthIndex, 1, 12, 0, 0, 0);

  while (cursor.getMonth() === monthIndex) {
    if (cursor.getDay() === 1 || cursor.getDay() === 4) {
      values.push(toIsoDate(cursor));
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  return values;
}

export function getCurrentMonthKey(from = new Date()): string {
  return `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, "0")}`;
}
