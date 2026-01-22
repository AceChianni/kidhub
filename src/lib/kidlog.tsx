// src/lib/kidlog.ts

export type MoodLogEntry = {
  mood: string;
  ts: number;
};

const KEY_LAST_MOOD = "kidhub:lastMood";
const KEY_MOOD_LOG = "kidhub:moodLog";

export function saveLastMood(mood: string) {
  try {
    const payload: MoodLogEntry = { mood, ts: Date.now() };
    localStorage.setItem(KEY_LAST_MOOD, JSON.stringify(payload));
  } catch {}
}

export function getLastMood(): MoodLogEntry | null {
  try {
    const raw = localStorage.getItem(KEY_LAST_MOOD);
    if (!raw) return null;
    return JSON.parse(raw) as MoodLogEntry;
  } catch {
    return null;
  }
}

export function appendMoodLog(mood: string, limit = 50) {
  try {
    const entry: MoodLogEntry = { mood, ts: Date.now() };
    const raw = localStorage.getItem(KEY_MOOD_LOG);
    const arr = raw ? (JSON.parse(raw) as MoodLogEntry[]) : [];
    const next = [entry, ...arr].slice(0, limit);
    localStorage.setItem(KEY_MOOD_LOG, JSON.stringify(next));
  } catch {}
}

export function getMoodLog(): MoodLogEntry[] {
  try {
    const raw = localStorage.getItem(KEY_MOOD_LOG);
    if (!raw) return [];
    return JSON.parse(raw) as MoodLogEntry[];
  } catch {
    return [];
  }
}
