import type { JDState } from '../types';

const JD_STORAGE_KEY = 'jd-tracker-active-jd';

export function getProgressKey(jdId: string): string {
  return `jd-tracker-progress-${jdId}`;
}

export function loadJD(): JDState | null {
  try {
    const raw = localStorage.getItem(JD_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JDState;
  } catch {
    return null;
  }
}

export function saveJD(jd: JDState): void {
  localStorage.setItem(JD_STORAGE_KEY, JSON.stringify(jd));
}

export function clearJD(): void {
  const jd = loadJD();
  if (jd) {
    // Also wipe the associated progress so the next JD starts clean
    localStorage.removeItem(getProgressKey(jd.id));
  }
  localStorage.removeItem(JD_STORAGE_KEY);
}

export function generateJDId(): string {
  return `jd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
